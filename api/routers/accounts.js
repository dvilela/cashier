const { Router } = require('express');
const service = require('../services/accounts');
const transactions = require('./transactions');
const transactionService = require('../services/transactions');
const logger = require('../helpers/logger');

const Linker = ({ url }) => (account) => {
  account.links = [{
    rel: 'self',
    hrel: url + '/api/v1/accounts/' + account._id,
    method: 'GET'
  }, {
    rel: 'edit',
    hrel: url + '/api/v1/accounts/' + account._id
  }, {
    rel: 'transactions',
    hrel: url + '/api/v1/accounts/' + account._id + '/transactions',
    method: 'GET'
  }, {
    rel: 'balance',
    hrel: url + '/api/v1/accounts/' + account._id + '/balance',
    method: 'GET'
  }];
  return account;
};

const Populator = (config) => {

  const transactionLinker = transactions.Linker(config);
  const transactionLinkers = (docs) => docs.map(doc => transactionLinker(doc));

  const populateAccountWithTransactions = (account) =>
    transactionService
      .find({ query: { _id: account.transactions } })
      .then(({ content: transactions }) => {
        account.transactions = transactionLinkers(transactions);
        return account;
      });

  return (accounts) => {
    if (accounts instanceof Array) {
      return Promise.all(accounts.map((account) => populateAccountWithTransactions(account)));
    }
    return populateAccountWithTransactions(accounts);
  };
};

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

module.exports = ({ config }) => {
  const router = Router();

  const linker = Linker(config);
  const linkers = (docs) => docs.map(doc => linker(doc));

  const populator = Populator(config);

  router.get('/', (req, res) =>
    service
      .find(req.query)
      .then(
        ({ totalCount, content: docs }) => {
          if (docs && docs.length) {
            return populator(docs)
              .then((docs) => {
                appendPagination(req, res, docs, totalCount);
                res.json(linkers(docs));
              });
          } else {
            res.sendStatus(204);
          }
        }
      )
      .catch((err) => handleError(err, res))
  );

  router.get('/:id', (req, res) =>
    service
      .findById(req.params.id, req.query)
      .then(
        (doc) => {
          if (doc == null) {
            res.sendStatus(204);
          } else {
            return populator(doc)
              .then((doc) => {
                res.json(linker(doc))
              });
          }
        }
      )
      .catch((err) => handleError(err, res))
  );

  router.post('/', (req, res) =>
    service
      .create(req.body)
      .then(
        () => res.sendStatus(201)
      )
      .catch((err) => handleError(err, res))
  );

  router.put('/:id', (req, res) =>
    service
      .update(req.params.id, req.body)
      .then(
        () => res.sendStatus(200)
      )
      .catch((err) => handleError(err, res))
  );

  router.delete('/:id', (req, res) =>
    service
      .deleteById(req.params.id)
      .then(
        () => res.sendStatus(204)
      )
      .catch((err) => handleError(err, res))
  );

  // transactions

  router.get('/:accountId/transactions', (req, res) => {
    service
      .findById(req.params.accountId)
      .then(
        (account) => {
          if (account == null) {
            res.status(404).send('Resource not found: Account');
          } else {
            return transactionService
              .find({ query: { _id: account.transactions } })
              .then(({ content: transactions }) => {
                if (transactions != null && transactions.length) {
                  res.send(transactionLinkers(transactions));
                } else {
                  res.sendStatus(204);
                }
              });
          }
        }
      )
      .catch((err) => handleError(err, res))
  });

  router.post('/:accountId/transactions', (req, res) => {
    transactionService
      .create(req.body)
      .then(
        (transaction) =>
          service
            .push(req.params.accountId, 'transactions', transaction._id)
            .then(() => res.sendStatus(201))
      )
      .catch((err) => handleError(err, res))
  });

  router.put('/:accountId/transactions/:transactionId', (req, res) => {
    transactionService
      .update(req.params.transactionId, req.body)
      .then(
        () => res.sendStatus(204)
      )
      .catch((err) => handleError(err, res))
  });

  router.delete('/:accountId/transactions/:transactionId', (req, res) => {
    transactionService
      .deleteById(req.params.transactionId)
      .then(
        () =>
          service
            .pull(req.params.accountId, 'transactions', req.params.transactionId)
            .then(() => res.sendStatus(204))
      )
  });

  return router;
}

//module.exports = ({ config }) => router({ config, service, linker: Linker(config), populator: Populator(config) });
module.exports.Linker = Linker;
module.exports.Populator = Populator;
