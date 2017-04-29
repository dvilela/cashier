const env = require('dotenv').config();
const express = require('express');
const config = require('./helpers/config');
const logger = require('./helpers/logger');
const bodyParser = require('body-parser');
const morgan = require('./helpers/morgan');
const middleware = require('./middleware');
const initializeDB = require('./db');
const routers = require('./routers');

Object.assign(config, require('./api-details')(config.api));

logger.debug('Starting cashier', { config, env } );

const app = express();

// 3rd party middleware
app.use(bodyParser.json());
app.use(morgan);

// internal middleware
app.use(middleware({ config }));

// api
app.use('/api', routers({ config }));

app.listen(config.api.port, (err) => {
  if (err) {
    logger.error('fatal', err);
    return process.exit(1);
  }
  logger.info(`API is running at ${config.url}`);
});

initializeDB({ mongodb: config.mongodb })
  .then(
    () => logger.info('Connected to mongodb', config.mongodb),
    (err) => logger.error(err)
  );
