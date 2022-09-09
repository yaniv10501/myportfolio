/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { green, cyan, red } = require('chalk');
const open = require('open');
require('ignore-styles');

require('@babel/register')({
  configFile: path.resolve(__dirname, '../babel.config.js'),
});

let validPaths;

const { buildCrawl } = require('./puppeteer');
const { initServer, addBuildRoutes } = require('./server');
const { step, shell } = require('./common');

const initialBuild = step('Initial Build', () => shell(`npm run build`));

const initServerStep = step('Init Server', initServer);

const crawlStep = step('Crawling', () =>
  buildCrawl('http://localhost:3500?loading=forever').then((res) => {
    validPaths = res;
  })
);

const addBuildRoutesStep = step('Build Routes', () => addBuildRoutes(validPaths));

const finalStep = () => {
  const buildWebsite = 'http://localhost:3500';
  console.log(green('Your Build Server Is Ready!'));
  console.log(green('Visit - ') + cyan(buildWebsite));
  console.log(green('And Test Your Build!'));
  open(buildWebsite);
};

Promise.resolve(true)
  .then(initialBuild)
  .then(initServerStep)
  .then(crawlStep)
  .then(addBuildRoutesStep)
  .then(finalStep)
  .catch((err) => {
    if (err) console.error(red(err.stack || err.toString()));
    process.exit(1);
  });
