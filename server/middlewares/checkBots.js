const path = require('path');
const fsR = require('fs-reverse');
const AuthorizationError = require('../utils/errors/AuthorizationError');

const checkBots = (req, res, next) => {
  const ipRequests = [];
  const ipOfSource = req.ip;
  const streamPromise = new Promise((resolve, reject) => {
    try {
      const readStream = fsR(path.join(__dirname, '../logs/request.log'), {});
      readStream.on('data', (line) => {
        if (line) {
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
      readStream.on('end', () => reject(new AuthorizationError('Invalid request')));
    } catch (err) {
      reject(err);
    }
  });
  streamPromise
    .then(() => {
      const isBot = ipRequests.some(({ message, userAgent }) => {
        if (userAgent !== req.header('user-agent')) return true;
        if (message.indexOf('GET /static/') === -1) {
          if (
            message === `${ipOfSource} GET /favicon.ico` ||
            `${ipOfSource} GET /site.webmanifest` ||
            `${ipOfSource} GET /test` ||
            `${ipOfSource} POST /email`
          )
            return false;
          if (message === `${ipOfSource} GET /` && ipRequests.length > 5) return false;
          return true;
        }
        return false;
      });
      if (isBot) {
        return next(new AuthorizationError('Invalid request'));
      }
      const origin = req.header('Referer');
      if (!origin) return res.redirect('/');
      return next();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = checkBots;
