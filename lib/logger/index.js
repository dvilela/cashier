const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      filename: 'logs/cashier.log',
      level: process.env.NODE_ENV == 'production' ? 'info' : 'debug',
      maxFiles: 5,
      maxsize: 100 * 1024 * 1024, // 100 MBytes
      timestamp: true,
      zippedArchive: true
    })
  ]
});

module.exports = logger;
