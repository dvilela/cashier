const mongoose = require('mongoose');
const { mongodb: { uri } } = require('./config');
const logger = require('./logger');

mongoose.Promise = global.Promise;

const connect = () =>
  mongoose.connect(uri).then(
    () => {},
    (err) =>
      logger.error(err)
  );

module.exports = { connect };
