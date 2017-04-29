const { Router } = require('express');
const banks = require('./banks');
const accounts = require('./accounts');
const transactions = require('./transactions');
const env = require('dotenv').config();

module.exports = ({ config }) => {
  const api = Router();

  api.get('/', (req, res) => {
    res.json({
      name: config.app.name,
      version: config.app.version,
      api_version: 'v1'
    });
  });

  const v1 = Router();

  v1.use('/banks', banks({ config }));

  if (env.parsed.NODE_ENV == 'development') {
    v1.use('/accounts', accounts({ config }));
  }

  v1.use('/transactions', transactions({ config }));

  api.use('/v1', v1);

  return api;
};
