const { router } = require('./helper');
const service = require('../services/banks');

module.exports = ({ config }) => router({ config, service });
