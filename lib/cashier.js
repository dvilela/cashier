const express = require('express');
const hateoasLinker = require('express-hateoas-links');

const config = require('./helpers/config');

const logger = require('./logger');

logger.debug('Starting cashier with configuration file:', config);

let { api: { host, port } } = config;

const details = require('./details')(config);
const { url, version } = details;

// express
const app = express();
app.use(hateoasLinker);

app.get('/', (req, res) => {
  res.json(
    details,
    [
      { rel: 'self', href: `${url}` }
    ]
  );
});

app.listen(port, (err) => {
  if (err) {
    logger.error(err);
  }
  logger.info(`API is running on port ${port}`);
  logger.info(`Send requests to ${url}`);
});

module.exports = details;
