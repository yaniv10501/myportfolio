require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const logger = require('./utils/logger');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const ResourceNotFound = require('./utils/errors/ResourceNotFound');
const ServerError = require('./utils/errors/ServerError');
const checkBots = require('./middlewares/checkBots');

const app = express();

const { PORT = 3001, NODE_ENV = 'development', API_KEY = 'secret-key' } = process.env;

app.set('port', PORT);
app.set('env', NODE_ENV);
app.set('trust proxy', true);
app.disable('etag');

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: [`'self'`, 'https://yanivapi.com'],
      },
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(express.static(path.join(__dirname, './build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.use(checkBots);

app.post('/email', (req, res, next) => {
  const { from, name, text, phoneNumber } = req.body;
  fetch('https://yanivapi.com/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      from,
      name,
      text,
      phoneNumber,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      res.send(response);
    })
    .catch((error) => {
      next(error);
    });
});

app.use(errorLogger);

app.use((req, res, next) => new ResourceNotFound(req, res, next));

app.use(ServerError);

app.listen(PORT, () => {
  logger.log(`Express Server started on Port ${PORT} | Environment : ${NODE_ENV}`);
});
