const open = require('open');
const { shell } = require('./common');

shell('webpack serve --config webpack.dev.config.js');
setTimeout(() => {
  const buildWebsite = 'http://localhost:3000';
  open(buildWebsite);
}, 2000);
