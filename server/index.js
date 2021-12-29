const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const corsOptions = require('./utils/cors');

const app = express();

const {
  PORT = 3000,
  NODE_ENV = 'development',
} = process.env;

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(helmet());

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/test', cors(corsOptions), (req, res, next) => {
  res.send(req.headers);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
