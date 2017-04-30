const accounts = require('./accounts');
const accountService = require('../services/accounts');
const { router } = require('./helper');
const service = require('../services/banks');

const Linker = ({ url }) => (bank) => {
  bank.links = [{
    rel: 'self',
    hrel: url + '/api/v1/banks/' + bank._id,
    method: 'GET'
  }, {
    rel: 'edit',
    hrel: url + '/api/v1/banks/' + bank._id
  }, {
    rel: 'accounts',
    hrel: url + '/api/v1/banks/' + bank._id + '/accounts'
  }];

  return bank;
};

// accounts

const Populator = (config) => {

  const accountLinker = accounts.Linker(config);
  const accountLinkers = (docs) => docs.map(doc => accountLinker(doc));
  const accountPopulator = accounts.Populator(config);

  const populateBankWithAccounts = (bank) =>
    accountService
      .find({ query: { _id: bank.accounts } })
      .then(({ content: accounts }) =>
        accountPopulator(accounts)
          .then((accounts) => {
            bank.accounts = accountLinkers(accounts);
            return bank;
          })
      );

  return (banks) => {
    if (banks instanceof Array) {
      return Promise.all( banks.map((bank) => populateBankWithAccounts(bank)) );
    }
    return populateBankWithAccounts(banks);
  };
};

module.exports = ({ config }) => router({ config, service, populator: Populator(config), linker: Linker(config) });

