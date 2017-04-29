const { crud } = require('./helper');
const Account = require('../models/Account');

module.exports = crud(Account);
