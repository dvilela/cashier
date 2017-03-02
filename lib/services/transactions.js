const { crud } = require('./helper');
const Transaction = require('../models/Transaction');

module.exports = crud(Transaction);
