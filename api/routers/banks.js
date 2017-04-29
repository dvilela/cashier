const { Router } = require('express');
const bankService = require('../services/banks');
const accountService = require('../services/accounts');
const accounts = require('./accounts');

const Linker = ({ url }) => (req, bank) => {
  if (bank.accounts != null) {
    bank.accounts = bank.accounts.map((accountId) => ({
      id: accountId,
      links: [{
        rel: 'self',
        hrel: url + req.baseUrl + '/' + bank._id + '/accounts/' + accountId,
        method: 'GET'
      }, {
        rel: 'balance',
        hrel: url + req.baseUrl + '/' + bank._id + '/accounts/' + accountId + '/balance',
        method: 'GET'
      }]
    }));
  }

  bank.links = [{
    rel: 'self',
    hrel: url + req.baseUrl + '/' + bank._id,
    method: 'GET'
  }, {
    rel: 'accounts',
    hrel: url + req.baseUrl + '/' + bank._id + '/accounts'
  }];

  return bank;
};

module.exports = ({ config }) => {
  const router = Router();

  // bank linker
  const linker = Linker(config);
  const linkers = (req, docs) => docs.map(doc => linker(req, doc));

  // account linker
  const accountLinker = accounts.Linker(config);
  const accountLinkers = (req, docs) => docs.map(doc => accountLinker(req, doc));

  const appendPagination = (req, res, entities, totalCount) => {
    res.append('X-Total-Count', totalCount);
    return {
      res
    };
  };

  router.get('/', (req, res) =>
    bankService.find(req.query).then(
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
    bankService.findById(req.params.id, req.query).then(
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
    bankService.create(req.body).then(
      (doc) => {
        res.status(201).json(linker(req, doc));
      },
      (err) => res.status(500).json(err)
    )
  );

  router.put('/:id', (req, res) =>
    bankService.update(req.params.id, req.body).then(
      (doc) => res.json(linker(req, doc)),
      (err) => res.status(500).json(err)
    )
  );

  router.delete('/:id', (req, res) =>
    bankService.deleteById(req.params.id).then(
      () => res.sendStatus(204),
      (err) => res.status(500).json(err)
    )
  );

  // accounts

  router.get('/:bank_id/accounts', (req, res) =>
    bankService.findById(req.params.bank_id, ["accounts"])
      .then((bank) => {
        if (bank == null) {
          res.status(404).send("Bank not found.");
        } else {
          req.query.query = Object.assign(
            {},
            req.query.query,
            { _id: bank.accounts.map(objId => objId.toString()) }
          );
          return accountService.find(req.query)
            .then(
              ({ totalCount, content: accounts }) => {
                if (accounts && accounts.length) {
                  appendPagination(req, res, accounts, totalCount).res.json(accountLinkers(req, accounts));
                } else {
                  res.sendStatus(204);
                }
              }
            );
        }
      })
  );

  return router;
};
