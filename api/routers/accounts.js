const { router } = require('./helper');
const service = require('../services/accounts');
const transactions = require('./transactions');
const transactionService = require('../services/transactions');

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
    hrel: url + '/api/v1/accounts/'  + account._id + '/transactions',
    method: 'GET'
  }, {
    rel: 'balance',
    hrel: url + '/api/v1/accounts/'  + account._id + '/balance',
    method: 'GET'
  }];
  return account;
};

// Transactions

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
      return Promise.all( accounts.map((account) => populateAccountWithTransactions(account)) );
    }
    return populateAccountWithTransactions(accounts);
  };
};

module.exports = ({ config }) => router({ config, service, linker: Linker(config), populator: Populator(config) });
module.exports.Linker = Linker;
module.exports.Populator = Populator;
