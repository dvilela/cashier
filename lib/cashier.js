const express = require('express');
const bodyParser = require('body-parser');
const config = require('./helpers/config');
const logger = require('./helpers/logger');

logger.debug('Starting cashier', config);

require('./helpers/mongoose').connect();

const { api: { host, port } } = config;
const details = require('./details')({ host, port });
const { url, version } = details;

// express
const app = express();
app.use(bodyParser.json());
app.use(require('./helpers/morgan'));
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.url}`, req.body);
  next();
});

app.get('/', (req, res) => {
  details.links = [ { rel: 'self', href: url, method: 'GET' } ];
  res.json(details);
});

const bankService = require('./services/banks');

const linkBank = (bank) => Object.assign(
  {},
  bank,
  {
    links: [{
      rel: 'self',
      hrel: url + '/banks/' + bank._id,
      method: 'GET'
    }]
  }
);

const linkBanks = (banks) => banks.map(bank => linkBank(bank));

app.get('/banks', (req, res) =>
  bankService.find().then(
    (banks) => res.json(linkBanks(banks))
  )
);

app.get('/banks/:id', (req, res) =>
  bankService.findById(req.params.id).then(
    (bank) => res.json(linkBank(bank))
  )
);

app.post('/banks', (req, res) =>
  bankService.create(req.body).then(
    (bank) => {
      bank.links = [{
        rel: 'self',
        hrel: url + '/banks/' + bank._id,
        method: 'GET'
      }];
      res.json(bank);
    },
    (err) => res.status(500).json(err)
  )
);

app.put('/banks/:id', (req, res) =>
  bankService.update(req.params.id, req.body).then(
    (bank) => res.json(linkBank(bank)),
    (err) => res.status(500).json(err)
  )
);

app.delete('/banks/:id', (req, res) =>
  bankService.deleteById(req.params.id).then(
    () => res.sendStatus(204),
    (err) => res.status(500).json(err)
  )
);

app.listen(port, (err) => {
  if (err) {
    logger.error(err);
  }
  logger.info(`API is running on port ${port}`);
  logger.info(`Send requests to ${url}`);
});

module.exports = details;
