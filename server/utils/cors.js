const AuthorizationError = require('./errors/AuthorizationError');

const whiteList = [''];
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new AuthorizationError('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
