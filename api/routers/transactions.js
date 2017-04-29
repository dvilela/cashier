const { router } = require('./helper');
const service = require('../services/transactions');

const Linker = ({ config }) => ({ req, transaction }) => {
  transaction.links = [{
    rel: 'self',
    hrel: url + req.baseUrl + '/transactions/' + transactionId,
    method: 'GET'
  }, {
    rel: 'edit',
    hrel: url + req.baseUrl + '/transactions/' + transactionId
  }];
  return transaction;
};

module.exports = ({ config }) => router({ config, service, linker: Linker });
