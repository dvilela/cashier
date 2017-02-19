const fs = require('fs');

try {
  fs.mkdirSync('./log');
} catch (err) {
  if (err.code != 'EEXIST') {
    throw err;
  }
}

try {
  fs.accessSync('.env', 'r');
} catch (err) {
  if (err.code != 'ENOENT') {
    throw err;
  }

  const sampleEnv = fs.readFileSync('./.sample-env');

  fs.writeFileSync('./.env', sampleEnv);
}
