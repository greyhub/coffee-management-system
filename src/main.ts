import app from './app';
import http from 'http';
import env from './env';
import logger from './_base/log/logger4js';
import ormInit from './ormConnection';

async function createExpressApp () {
  await ormInit();
  app.set('port', env.PORT || 80);

  const server = http.createServer(app);
  server.listen(env.PORT || 80);
  console.table([{ Author: '@vietnha', Contact: 'viet.nha173465@sis.hust.edu.vn', Server: 'localhost:'+env.PORT}]);
  logger.debug(`Service is listening on PORT=${env.PORT}`);
}
createExpressApp();