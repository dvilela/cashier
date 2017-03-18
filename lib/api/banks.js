const { router } = require('./helper');
const service = require('../services/banks');
const accounts = require('./accounts');
const { Router } = require('express');
const ObjectId = require('mongoose').Types.ObjectId;

const linker = ({ url }) => (req, bank) => {
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

  bank.links = [{
    rel: 'self',
    hrel: url + req.baseUrl + '/' + bank._id,
    method: 'GET'
  }, {
    rel: 'create_account',
    hrel: url + req.baseUrl + '/' + bank._id + '/accounts',
    method: 'POST'
  }, {
    rel: 'list_accounts',
    hrel: url + req.baseUrl + '/' + bank._id + '/accounts',
    method: 'GET'
  }];

  return bank;
};

module.exports = ({ config }) => {
  const bankRouter = router({ config, service, linker: linker(config) });
  bankRouter.use(
    '/:bank_id/accounts',
    (req, res, next) => {
      req.query.query = Object.assign({}, req.query.query, { bank_id: req.params.bank_id });
      next();
    },
    accounts({ config })
  );
  return bankRouter;
};
