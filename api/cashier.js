const env = require('dotenv').config();
const express = require('express');
const config = require('./helpers/config');
const logger = require('./helpers/logger');
const bodyParser = require('body-parser');
const morgan = require('./helpers/morgan');
const middleware = require('./middleware');
const initializeDB = require('./db');
const routers = require('./routers');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

Object.assign(config, require('./helpers/api-details')(config.api));

logger.debug('Starting cashier', { config, env });

const app = express();

// enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

/* Temp code lines that have to be moved (code beauty reasons) */
const fs = require('fs');
const SECRET = fs.readFileSync(require('path').resolve('API_SECRET'));
// Security with JWT
if (SECRET != null) {
  app.use(expressJWT({ secret: SECRET }).unless({ path: ['/login', { url: '/api/v1/users', methos: 'POST' }] }));
  // login
  const validateUser = (req, res, next) => {
    if (req.body.username == null) {
      res.status(400).send('Username Required');
      return;
    }
    if (req.body.password == null) {
      res.status(400).send('Password Required');
      return;
    }
    next();
  };
  const User = require('./models/User');
  app.post('/login', validateUser);
  app.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) {
          res.status(401).send('Invalid Password');
        } else {
          const myToken = jwt.sign({ username: req.body.username }, SECRET);
          res.status(200).json(myToken);
        }
      });
    });
  });
  app.post('/api/v1/users', validateUser);
  app.post('/api/v1/users', (req, res) => {
    User.create({ username: req.body.username, password: req.body.password })
      .then(() => res.send(201));
  });
}

// 3rd party middleware
app.use(morgan);

// internal middleware
app.use(middleware({ config }));

// api
app.use('/api', routers({ config }));

app.listen(config.api.port, (err) => {
  if (err) {
    logger.error('fatal', err);
    return process.exit(1);
  }
  logger.info(`API is running at ${config.apiPublicUrl}`);
});

initializeDB({ mongodb: config.mongodb })
  .then(
    () => logger.info('Connected to mongodb', config.mongodb),
    (err) => logger.error(err)
  );
