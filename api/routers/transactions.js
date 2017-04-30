const { router } = require('./helper');
const service = require('../services/transactions');

const Linker = ({ url }) => (transaction) => {
  transaction.links = [{
    rel: 'self',
    hrel: url + '/api/v1/transactions/' + transaction._id,
    method: 'GET'
  }, {
    rel: 'edit',
    hrel: url + '/api/v1/transactions/' + transaction._id
  }];
  return transaction;
};

module.exports = ({ config }) => router({ config, service, linker: Linker(config) });
module.exports.Linker = Linker;
