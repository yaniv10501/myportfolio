const fetch = require('node-fetch');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const corsOptions = require('./utils/cors');

const app = express();

const {
  PORT = 3001,
  NODE_ENV = 'development',
} = process.env;

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "default-src": ["'self'"],
  },
}));
app.options('*', cors(corsOptions));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/test', (req, res, next) => {
  const ipOfSource = req.socket.remoteAddress;
  const origin = req.header('Referer'); 
  fetch('https://yanivapi.com/email', {
    headers: {
    'Origin': origin,
    },
  }).then(async (res2) => {
    res.send({ ip: ipOfSource, origin, res: await res2.json()});
  });
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, 'localhost', () => {
  console.log(`Server listening on ${PORT}`);
});
