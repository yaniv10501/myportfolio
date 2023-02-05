/* eslint-disable import/no-extraneous-dependencies */
const { green, cyan, red } = require('chalk');
const open = require('open');
const fs = require('fs');
const path = require('path');
require('ignore-styles');

require('@babel/register')({
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: [
    [
      'transform-assets',
      {
        extensions: ['webm', 'png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'],
        name: 'static/media/[name].[hash].[ext]',
      },
    ],
    [
      'css-modules-transform',
      {
        generateScopedName: '[hash:base64:5]',
        extensions: ['.css'],
      },
    ],
  ],
});

const { buildCrawl } = require('./puppeteer');
const { initServer, addBuildRoutes } = require('./server');
const { step, shell } = require('./common');

const removeServerBundle = () => {
  fs.rmSync(path.join(__dirname, '../build/server'), { recursive: true, force: true });
};

const initialBuild = step('Initial Build', () => shell(`npm run build`));

const ssrBuild = step('SSR Build', () =>
  shell(`webpack --config ./webpack.server.config.js && node ./build/server/bundle.js`)
);

// const initServerStep = step('Init Server', initServer);
//
// const crawlStep = step('Crawling', () =>
//   buildCrawl('http://localhost:3500?loading=forever').then((res) => {
//     validPaths = res;
//   })
// );

const addBuildRoutesStep = step('Build Routes', () => addBuildRoutes());

const removeServerBundleStep = step('Remove Server Bundle', () => removeServerBundle());

const finalStep = () => {
  const buildWebsite = 'http://localhost:3500';
  console.log(green('Your Build Server Is Ready!'));
  console.log(green('Visit - ') + cyan(buildWebsite));
  console.log(green('And Test Your Build!'));
  open(buildWebsite);
};

Promise.resolve(true)
  .then(initialBuild)
  .then(ssrBuild)
  .then(addBuildRoutesStep)
  .then(removeServerBundleStep)
  .then(finalStep)
  .catch((err) => {
    if (err) console.error(red(err.stack || err.toString()));
    process.exit(1);
  });
