const { router } = require('./helper');
const service = require('../services/accounts');

const Linker = ({ url }) => (req, account) => {
  if (account.transactions != null) {
    account.transactions = account.transactions.map((transactionId) => ({
      id: transactionId,
      links: [{
        rel: 'self',
        hrel: url + req.baseUrl + '/' + account._id + '/transactions/' + transactionId,
        method: 'GET'
      }]
    }));
  }
  account.links = [{
    rel: 'self',
    hrel: url + req.baseUrl + '/' + account._id,
    method: 'GET'
  }, {
    rel: 'transactions',
    hrel: url + req.baseUrl + '/' + account._id + '/transactions'
  }, {
    rel: 'balance',
    hrel: url + req.baseUrl + '/' + account._id + '/balance',
    method: 'GET'
  }];
  return account;
};

module.exports = ({ config }) => router({ config, service, linker: Linker(config) });
module.exports.Linker = Linker;
