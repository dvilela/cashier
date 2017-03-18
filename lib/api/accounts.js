const { router } = require('./helper');
const service = require('../services/accounts');

const linker = ({ url }) => (req, account) => {
  account.transactions = account.transactions.map((transactionId) => ({
    id: transactionId,
    links: [{
      rel: 'self',
      hrel: url + req.baseUrl + '/' + account._id + '/transactions/' + transactionId,
      method: 'GET'
    }]
  }));
  account.links = [{
    rel: 'self',
    hrel: url + req.baseUrl + '/' + account._id,
    method: 'GET'
  }, {
    rel: 'balance',
    hrel: url + req.baseUrl + '/' + account._id + '/balance',
    method: 'GET'
  }];
  return account;
};

module.exports = ({ config }) => router({ config, service, linker: linker(config) });
