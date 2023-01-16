/* eslint-disable import/no-extraneous-dependencies */
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const StyleContext = require('isomorphic-style-loader/StyleContext');
const path = require('path');
const fs = require('fs');
const App = require('../src/components/App').default;
const logger = require('./logger');
const HtmlWritable = require('./HtmlWritable');

const routes = [''];
let chain = Promise.resolve();
routes.forEach((route) => {
  chain = chain.then(
    async () =>
      new Promise((resolve, reject) => {
        const css = new Set(); // CSS for all rendered React components
        const insertCss = (...styles) => styles.forEach((style) => css.add(style._getCss()));
        const writable = new HtmlWritable();
        const stream = ReactDOMServer.renderToPipeableStream(
          <StyleContext.Provider value={{ insertCss }}>
            <App />
          </StyleContext.Provider>,
          {
            onShellReady() {
              // The content above all Suspense boundaries is ready.
              // If something errored before we started streaming, we set the error code appropriately.
              // res.statusCode = didError ? 500 : 200;
              // res.setHeader('Content-type', 'text/html');
              // stream.pipe(writable);
            },
            onShellError(err) {
              // Something errored before we could complete the shell so we emit an alternative shell.
              logger.log(err);
            },
            onAllReady() {
              // If you don't want streaming, use this instead of onShellReady.
              // This will fire after the entire page content is ready.
              // You can use this for crawlers or static generation.
              stream.pipe(writable);
            },
          }
        );
        const htmlData = fs.readFileSync(path.join(__dirname, `../index.html`), 'utf8');
        writable.on('finish', () => {
          const html = writable.getHtml();
          let data = htmlData.replace('</head>', `<style>${[...css].join('')}</style></head>`);
          data = data.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
          fs.writeFileSync(path.join(__dirname, '../index.html'), data);
          resolve();
        });
      })
  );
});
