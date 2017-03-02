const { Router } = require('express');

const getDefaultLinker = ({ url }) => (req, doc) => Object.assign(
    {},
    doc,
    {
      links: [{
        rel: 'self',
        hrel: url + req.baseUrl + '/' + doc._id,
        method: 'GET'
      }]
    }
  );

const router = ({ config, service, linker = getDefaultLinker(config) }) => {
  const router = Router();

  const linkers = (req, docs) => docs.map(doc => linker(req, doc));

  const appendPagination = (req, res, entities, totalCount) => {
    res.append('X-Total-Count', totalCount);
    return {
      res
    };
  };

  router.get('/', (req, res) =>
    service.find(req.query).then(
      ({ totalCount, content: docs }) => {
        if (docs && docs.length) {
          appendPagination(req, res, docs, totalCount).res.json(linkers(req, docs));
        } else {
          res.sendStatus(204);
        }
      }
    )
  );

  router.get('/:id', (req, res) =>
    service.findById(req.params.id).then(
      (doc) => {
        if (doc == null) {
          res.sendStatus(204);
        } else {
          res.json(linker(req, doc));
        }
      }
    )
  );

  router.post('/', (req, res) =>
    service.create(req.body).then(
      (doc) => {
        res.status(201).json(linker(req, doc));
      },
      (err) => res.status(500).json(err)
    )
  );

  router.put('/:id', (req, res) =>
    service.update(req.params.id, req.body).then(
      (doc) => res.json(linker(req, doc)),
      (err) => res.status(500).json(err)
    )
  );

  router.delete('/:id', (req, res) =>
    service.deleteById(req.params.id).then(
      () => res.sendStatus(204),
      (err) => res.status(500).json(err)
    )
  );

  return router;
};

module.exports = { router };
