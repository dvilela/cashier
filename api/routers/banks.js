const { Router } = require('express');
const bankService = require('../services/banks');
const accountService = require('../services/accounts');
const accounts = require('./accounts');

const Linker = ({ url }) => (req, bank) => {
  bank.links = [{
    rel: 'self',
    hrel: url + req.baseUrl + '/' + bank._id,
    method: 'GET'
  }, {
    rel: 'edit',
    hrel: url + req.baseUrl + '/' + bank._id
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
  };

  router.get('/', (req, res) =>
    bankService.find(req.query).then(
      ({ totalCount, content: banks }) => {
        if (banks && banks.length) {
          populateAccounts(req, banks)
            .then((banks) => {
              appendPagination(req, res, banks, totalCount);
              res.json(linkers(req, banks));
            });
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
          populateAccounts(req, doc)
            .then((bank) => res.json(linker(req, bank)));
        }
      }
    )
  );

  router.post('/', (req, res) =>
    bankService.create(req.body).then(
      (doc) => {
        populateAccounts(req, doc)
          .then((doc) => res.status(201).json(linker(req, doc)));
      },
      (err) => res.status(500).json(err)
    )
  );

  router.put('/:id', (req, res) =>
    bankService.update(req.params.id, req.body).then(
      (doc) => populateAccounts(req, doc)
                .then((doc) => res.json(linker(req, doc))),
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

  const populateBankWithAccount = (req, bank) =>
    accountService
      .find({ query: { _id: bank.accounts } })
      .then(({ content: accounts }) => {
        bank.accounts = accountLinkers(req, accounts);
        return bank;
      });

  const populateAccounts = (req, banks) => {
    if (banks instanceof Array) {
      return Promise.all( banks.map((bank) => populateBankWithAccount(req, bank)) );
    }
    return populateBankWithAccount(req, banks);
  };

  return router;
};
