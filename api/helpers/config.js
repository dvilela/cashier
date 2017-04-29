const yaml = require('yamljs');
const fs = require('fs');

const defaultFile = 'conf/cashier.yml';

const { config: configFile } = process.env;

module.exports = yaml.load(configFile != null ? configFile : defaultFile);
