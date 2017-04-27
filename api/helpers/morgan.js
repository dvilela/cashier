const morgan = require('morgan');
const rfs = require('rotating-file-stream');

// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: 'log'
});

const isProduction = process.env.NODE_ENV == 'production';

const skip = isProduction ? (req, res) => res.statusCode < 400 : undefined;

module.exports = morgan('combined', {
  skip,
  stream: accessLogStream
});
