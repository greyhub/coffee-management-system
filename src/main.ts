import app from './app';
import http from 'http';
import env from './env';
import logger from './_base/log/logger4js';
import ormInit from './ormConnection';

async function createExpressApp () {
  await ormInit();
  app.set('port', process.env.PORT || 80);

  logger.debug("PORT-process" + process.env.PORT);
  logger.debug("PORT-env" + env.PORT);

  // const server = http.createServer(app);
  // server.listen(process.env.PORT);
  app.listen(process.env.PORT);
  // server.listen(process.env.PORT || 80, '0.0.0.0');
  logger.debug(`Service is listening on PORT=${env.PORT}`);
}
createExpressApp();