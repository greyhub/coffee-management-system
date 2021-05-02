import app from './app';
import env from './env';
import logger from './_base/log/logger4js';
import ormInit from './ormConnection';

logger.debug("run createExpressApp");
async function createExpressApp () {
  await ormInit();
  app.set('port', process.env.PORT || 80);

  logger.debug("PORT-process" + process.env.PORT);
  logger.debug("PORT-env" + env.PORT);

  // const server = http.createServer(app);
  // server.listen(process.env.PORT);
  app.listen(process.env.PORT || 80);
  // server.listen(process.env.PORT || 80, '0.0.0.0');
  logger.debug(`Service is listening on PORT=${process.env.PORT}`);
}
createExpressApp();
export default 0;