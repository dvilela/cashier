module.exports = ({ host, port }) => {
  if (host == null || process.env.NODE_ENV == 'development') {
    host = 'localhost';
  }
  const { name, version } = require('../../package.json');
  return {
    app: {
      name,
      version
    },
    url: `http://${host}:${port}`
   };
};
