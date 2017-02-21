module.exports = ({ host, port }) => {
  if (host == null) {
    host = require('os').hostname();
  }
  const { name, version } = require('../package.json');
  return {
    app: {
      name,
      version
    },
    url: `http://${host}:${port}`
   };
};
