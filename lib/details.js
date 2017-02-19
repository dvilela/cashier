module.exports = ({ host, port }) => {
  if (host == null) {
    host = require('os').hostname();
  }
  return {
    url: `http://${host}:${port}`,
    version: require('../package.json').version
   };
};
