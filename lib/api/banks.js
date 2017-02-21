const { Router } = require('express');

module.exports = ({ config }) => {
  const router = Router();

  const bankService = require('../services/banks');

  const linkBank = (req, bank) => Object.assign(
    {},
    bank,
    {
      links: [{
        rel: 'self',
        hrel: config.url + req.baseUrl + '/' + bank._id,
        method: 'GET'
      }]
    }
  );

  const linkBanks = (req, banks) => banks.map(bank => linkBank(req, bank));

  const appendPagination = (req, res, entities, totalCount) => {
    res.append('X-Total-Count', totalCount);
    return {
      res
    };
  };

  router.get('/', (req, res) =>
    bankService.find(req.query).then(
      ({ totalCount, content: banks }) =>
        appendPagination(req, res, banks, totalCount).res.json(linkBanks(req, banks))
    )
  );

  router.get('/:id', (req, res) =>
    bankService.findById(req.params.id).then(
      (bank) => res.json(linkBank(req, bank))
    )
  );

  router.post('/', (req, res) =>
    bankService.create(req.body).then(
      (bank) => {
        res.json(linkBank(req, bank));
      },
      (err) => res.status(500).json(err)
    )
  );

  router.put('/:id', (req, res) =>
    bankService.update(req.params.id, req.body).then(
      (bank) => res.json(linkBank(req, bank)),
      (err) => res.status(500).json(err)
    )
  );

  router.delete('/:id', (req, res) =>
    bankService.deleteById(req.params.id).then(
      () => res.sendStatus(204),
      (err) => res.status(500).json(err)
    )
  );

  return router;
}
