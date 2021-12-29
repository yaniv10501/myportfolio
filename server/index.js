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
    "default-src": ["'self'", "https://yanivapi.com/email"],
  },
}));
app.options('*', cors(corsOptions));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/test',  (req, res, next) => {
  const ipOfSource = req.connection.remoteAddress;
  res.send({ ip: ipOfSource, origin: req.header('Referer')});
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, 'localhost', () => {
  console.log(`Server listening on ${PORT}`);
});
