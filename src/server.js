const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('./common/logger');
const pino = require('express-pino-logger')({
  logger,
});
const { NODE_ENV, APP_ID } = require('./common/config');

const app = express();

module.exports = class Server {
  constructor(version) {
    this.version = version;
    app.use(pino);

    app.set('view engine', 'ejs'); // 사용할 템플릿 엔진
    app.set('views', path.resolve(`${__dirname}/views`)); // 렌더링할 파일 경로

    app.use(express.static(`${__dirname}/public`));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  router(routes) {
    routes(app);
    return this;
  }

  listen(port) {
    const welcome = (p) => () =>
      logger.info(
        `${APP_ID}: ${this.version} is up and running in NODE_ENV:${NODE_ENV} on port: ${p}`
      );
    this.server = http.createServer(app).listen(port, welcome(port));
    return this;
  }
};
