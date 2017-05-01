module.exports = ({ host, port, publicUrl }) => {
  if (host == null || process.env.NODE_ENV == 'development') {
    host = 'localhost';
  }
  const url = `http://${host}:${port}`;
  if (publicUrl == null || process.env.NODE_ENV == 'development') {
    publicUrl = url + '/api/v1';
  }
  const { name, version } = require('../../package.json');
  return {
    app: {
      name,
      version
    },
    url,
    apiPublicUrl: publicUrl
   };
};
