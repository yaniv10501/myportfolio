const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const fsR = require('fs-reverse');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOptions = require('./utils/cors');

const app = express();

const {
  PORT = 3001,
  NODE_ENV = 'development',
} = process.env;

app.set('port', PORT);
app.set('env', NODE_ENV);
app.set('trust proxy',true);
app.disable('etag');

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
    },
  },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
}));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(requestLogger);

app.get('/test', async (req, res, next) => {
  let ipRequests = [];
  const ipOfSource = req.ip;
  const streamPromise = new Promise((resolve, reject) => {
    try {
      const readStream = fsR(path.join(__dirname, '../logs/request.log'), {})
      readStream.on('data', (line) => {
        if(line) {
          const parsedLine = JSON.parse(line);
          if (parsedLine.message.indexOf(ipOfSource) !== -1) {
            ipRequests.push({
              message: parsedLine.message,
              userAgent: parsedLine.meta.req.headers['user-agent'],
            });
            if (parsedLine.message === `${ipOfSource} GET /`) {
              readStream.destroy();
              resolve(ipRequests);
            }
          }
        }
      });
      readStream.on('end', () => reject(new Error('Hey')));
    } catch (err) { reject(err) }
  });
  await streamPromise.catch((err) => console.log(err));
  console.log(req.header('user-agent'));
  const isGood = ipRequests.some(({ message, userAgent }, index) => {
    if (userAgent !== req.header('user-agent')) return false;
    if (message.indexOf('GET /static/') === -1) {
      if (message === `${ipOfSource} GET /` && ipRequests.length > 5) return true;
      return false;
    }
    return true;
  });
  if (!isGood) {
    console.log('hey');
    return res.send('email Send');
  }
  const origin = req.header('Referer');
  if (!origin) return res.redirect('/');
  await fetch('https://yanivapi.com/email', {
    headers: {
    'Origin': origin,
    },
  }).then(async (res2) => {
    res.cookie('test', 'hey', { maxAge: 900000, httpOnly: true });
    res.status(200).send({ ip: ipOfSource, origin, res: await res2.json()});
  });
});

app.get('/', (req, res, next) => {
  console.log('hey');
  res.cookie('test2', 'hey', { maxAge: 900000, httpOnly: true });
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
  return res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
