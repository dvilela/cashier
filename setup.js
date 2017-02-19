const fs = require('fs');

try {
  fs.accessSync('.env', 'r');
} catch (err) {
  if (err.code != 'ENOENT') {
    throw err;
  }
}

const sampleEnv = fs.readFileSync('./.sample-env');

try {
  fs.mkdirSync('./logs');
} catch (err) {
  if (err.code != 'EEXIST') {

  }
}

fs.writeFileSync('./.env', sampleEnv);
