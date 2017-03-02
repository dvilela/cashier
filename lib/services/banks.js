const { crud } = require('./helper');
const Bank = require('../models/Bank');

module.exports = crud(Bank);
