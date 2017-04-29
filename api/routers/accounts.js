const { router } = require('./helper');
const service = require('../services/accounts');

const Linker = ({ url }) => (req, account) => {
  account.links = [{
    rel: 'self',
    hrel: url + '/accounts/' + account._id,
    method: 'GET'
  }, {
    rel: 'edit',
    hrel: url + '/accounts/' + account._id
  }, {
    rel: 'transactions',
    hrel: url + '/accounts/'  + account._id + '/transactions',
    method: 'GET'
  }, {
    rel: 'balance',
    hrel: url + '/accounts/'  + account._id + '/balance',
    method: 'GET'
  }];
  return account;
};

module.exports = ({ config }) => router({ config, service, linker: Linker(config) });
module.exports.Linker = Linker;
