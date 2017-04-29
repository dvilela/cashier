const winston = require('winston');

const level = process.env.NODE_ENV == 'production' ? 'info' : 'debug';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level
    }),
    new (winston.transports.File)({
      filename: 'log/cashier.log',
      level,
      maxFiles: 5,
      maxsize: 100 * 1024 * 1024, // 100 MBytes
      timestamp: true,
      zippedArchive: true
    })
  ]
});

module.exports = logger;
