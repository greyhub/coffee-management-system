import {config} from 'dotenv';
import logger from './_base/log/logger4js';

const result = config();

if (result.error) {
  logger.error("FAILED: LOAD .ENV");
  throw result.error;
}
else {
  logger.debug("SUCCEED: LOAD .ENV");
}

class EnvConfig {
  private static _instance: EnvConfig
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public readonly PORT = (() => (process.env.PORT) ? parseInt(process.env.PORT, 10) : 8080)() || 8080
  public readonly DB_HOST = (() => (process.env.DB_HOST) ? process.env.DB_HOST.toString() : "127.0.0.1")()  || "127.0.0.1"
  public readonly DB_PORT = (() => (process.env.DB_PORT) ? parseInt(process.env.DB_PORT, 10) : 3306)() || 3306
  public readonly DB_NAME = (() => (process.env.DB_NAME) ? process.env.DB_NAME.toString() : "test")() || "test"
  public readonly DB_USERNAME = (() => (process.env.DB_USERNAME) ? process.env.DB_USERNAME.toString() : "root")() || "root"
  public readonly DB_PASSWORD = (() => (process.env.DB_PASSWORD) ? process.env.DB_PASSWORD.toString() : "123456")() || "123456"
  public readonly SECRECT_KEY = (() => (process.env.SECRECT_KEY) ? process.env.SECRECT_KEY.toString() : "Aa2b3c4d2")() || "Aa2b3c4d2"
}

const envConfig = EnvConfig.Instance;
logger.debug(JSON.stringify(envConfig));

export default envConfig;