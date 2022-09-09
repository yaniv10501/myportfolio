/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const { green, cyan, red } = require('chalk');
const path = require('path');
const fetch = require('node-fetch');
const ServerError = require('./ServerError');
const ResourceNotFound = require('./ResourceNotFound');
const logger = require('./logger');

const { PORT = 3500 } = process.env || {};

let server;

const initServer = () => {
  const initServerPromise = new Promise((resolve) => {
    const app = express();
    logger.log(cyan('Initializing Server...'));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../build')));
    app.all('/api/*', (req, res) => {
      if (req.method === 'GET') {
        fetch(`http://localhost:5000${req.path}`)
          .then((response) => response.json())
          .then((response) => {
            res.json(response);
          })
          .catch((error) => logger.log(red(error)));
      } else {
        fetch(`http://localhost:5000${req.path}`, {
          method: req.method,
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(req.body),
        })
          .then((response) => response.json())
          .then((response) => {
            res.json(response);
          })
          .catch((error) => logger.log(red(error)));
      }
    });
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, `../build/index.html`));
    });
    app.use((req, res, next) => new ResourceNotFound(req, res, next));
    app.use(ServerError);
    server = app.listen(PORT, () => {
      logger.log(cyan('Initialized Server: ') + green(`Server is listening on port - ${PORT}`));
      resolve();
    });
  });
  return initServerPromise;
};

const addBuildRoutes = (validPaths) => {
  const addBuildRoutesPromise = new Promise((resolve) => {
    const addMoreRoutes = () => {
      const app = express();
      app.use(express.json());
      app.use(express.static(path.join(__dirname, '../build')));
      logger.log(cyan('Adding Routes to serve...'));
      if (Array.isArray(validPaths)) {
        validPaths.forEach((validPath) => {
          app.get(`/${validPath}`, (req, res) => {
            res.sendFile(path.join(__dirname, `../build/${validPath}.html`));
          });
          logger.log(cyan('Added Route: ') + green(`/${validPath}`));
        });
      }
      app.all('/api/*', (req, res) => {
        if (req.method === 'GET') {
          fetch(`http://localhost:5000${req.path}`)
            .then((response) => response.json())
            .then((response) => {
              res.json(response);
            })
            .catch((error) => logger.log(red(error)));
        } else {
          fetch(`http://localhost:5000${req.path}`, {
            method: req.method,
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(req.body),
          })
            .then((response) => response.json())
            .then((response) => {
              res.json(response);
            })
            .catch((error) => logger.log(red(error)));
        }
      });
      app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, `../build/index.html`));
      });
      app.use((req, res, next) => new ResourceNotFound(req, res, next));
      app.use(ServerError);
      server = app.listen(PORT, () => {
        logger.log(cyan('Initialized Server: ') + green(`Server is listening on port - ${PORT}`));
        resolve();
      });
    };
    if (server.close) {
      server.close();
      logger.log(cyan('Initializing Server: ') + green('Closed out remaining connections'));
      addMoreRoutes();
    } else {
      addMoreRoutes();
    }
  });
  return addBuildRoutesPromise;
};

module.exports = { initServer, addBuildRoutes };
