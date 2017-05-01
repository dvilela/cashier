const { Router } = require('express');
const logger = require('../helpers/logger');

const getDefaultLinker = () => (doc) => doc;

const router = ({ config, service, linker = getDefaultLinker(), populator = (req, docs) => Promise.resolve(docs) }) => {
  const router = Router();

  const linkers = (docs) => docs.map(doc => linker(doc));

  const appendPagination = (req, res, entities, totalCount) => {
    res.append('X-Total-Count', totalCount);
  };

  const handleError = (err, res) => {
    logger.error(err);
    res.status(500).json({
      errors: [{
        userMessage: "Oh no! Unexpected error occurred. You can try again later.",
        internalMessage: err.message
      }]
    });
  };

  router.get('/', (req, res) =>
    service.find(req.query)
      .then(
        ({ totalCount, content: docs }) => {
          if (docs && docs.length) {
            populator(docs)
              .then((docs) => {
                appendPagination(req, res, docs, totalCount);
                res.json(linkers(docs));
              })
              .catch((err) => handleError(err, res))
          } else {
            res.sendStatus(204);
          }
        }
      )
      .catch((err) => handleError(err, res))
  );

  router.get('/:id', (req, res) =>
    service.findById(req.params.id, req.query)
      .then(
        (doc) => {
          if (doc == null) {
            res.sendStatus(204);
          } else {
            populator(doc)
              .then((doc) => {
                res.json(linker(doc))
              })
              .catch((err) => handleError(err, res));
          }
        }
      )
      .catch((err) => handleError(err, res))
  );

  router.post('/', (req, res) =>
    service.create(req.body)
      .then(
        (doc) => populator(doc)
                  .then((doc) => res.status(201).json(linker(doc)))
                  .catch((err) => handleError(err, res)),
        (err) => res.status(500).json(err)
      )
      .catch((err) => handleError(err, res))
  );

  router.put('/:id', (req, res) =>
    service.update(req.params.id, req.body)
      .then(
        (doc) => populator(doc)
                  .then((doc) => res.json(linker(doc)))
                  .catch((err) => handleError(err, res)),
        (err) => res.status(500).json(err)
      )
      .catch((err) => handleError(err, res))
  );

  router.delete('/:id', (req, res) =>
    service.deleteById(req.params.id)
      .then(
        () => res.sendStatus(204),
        (err) => res.status(500).json(err)
      )
      .catch((err) => handleError(err, res))
  );

  return router;
};

module.exports = { router };
