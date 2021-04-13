import {configure, getLogger} from 'log4js';

const loggerInit: any = () => {
  const logger = getLogger();
  logger.level = 'debug';

  configure({
    appenders: { expressjs: { type: "fileSync", filename: "debug.log" }, console: {type: "console"}},
    categories: { default: { appenders: ["expressjs", 'console'], level: "debug" } }
  })

  return logger;
}

const logger = loggerInit();

export default logger;