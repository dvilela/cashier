const { router } = require('./helper');
const service = require('../services/transactions');

module.exports = ({ config }) => router({ config, service });
