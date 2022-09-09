/* eslint-disable import/no-extraneous-dependencies */
const execa = require('execa');
const { green, cyan } = require('chalk');
const logger = require('./logger');

const step = (name, fn) => async () => {
  logger.log(cyan('Processing: ') + green(name));
  await fn();
  logger.log(cyan('Processed: ') + green(name));
};

const shell = (cmd) => execa(cmd, { stdio: ['pipe', 'pipe', 'inherit'], shell: true });

module.exports = {
  shell,
  step,
};
