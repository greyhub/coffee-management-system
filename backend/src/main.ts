import app from './app';
import env from './env';
import logger from './_base/log/logger4js';
import ormInit from './ormConnection';

logger.debug("run createExpressApp");
logger.debug("-->-process" + process.env.PORT);
logger.debug("-->-env" + env.PORT);
async function createExpressApp () {
  app.set('port', process.env.PORT || 80);

  logger.debug("SS:PORT-process" + process.env.PORT);
  logger.debug("SS:PORT-env" + env.PORT);

  // const server = http.createServer(app);
  // server.listen(process.env.PORT);
  app.listen(process.env.PORT || 80);
  console.table([{ Author: '@vietnha', Contact: 'viet.nha173465@sis.hust.edu.vn', Server: 'localhost:'+env.PORT}]);
  // server.listen(process.env.PORT || 80, '0.0.0.0');
  logger.debug(`Service is listening on PORT=${process.env.PORT}`);

  await ormInit();
}
createExpressApp();
// ormInit(createExpressApp);
export default 0;