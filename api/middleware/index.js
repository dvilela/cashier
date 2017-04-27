const { Router } = require('express');
const { toMongo } = require('../helpers/query');
const logger = require('../helpers/logger');

const log = (req, res, next) => {
  logger.debug(`${req.method} ${req.url}`, req.body);
  next();
};

const mongoQuery = (req, res, next) => {
  try {
    req.query = toMongo(req.query);
    next();
  } catch (e) {
    res.sendStatus(400).send(e);
  }
};

const middleware = ({ config }) => {
  const routes = new Router();

  routes.use(log);
  routes.use(mongoQuery);

  return routes;
};

module.exports = middleware;
