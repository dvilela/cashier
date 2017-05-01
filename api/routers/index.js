const { Router } = require('express');
const accounts = require('./accounts');
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

  v1.use('/accounts', accounts({ config }));

  api.use('/v1', v1);

  return api;
};
