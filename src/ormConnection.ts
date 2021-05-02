import "reflect-metadata";
import {createConnection} from "typeorm";
import env from "./env";
import logger from "./_base/log/logger4js";

const ormInit = async () => {
  try {
    const connection = await createConnection({
      type: "mysql",
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      entities: [
        "./entity/*.js"
      ],
      migrations: [
        "./migration/*.js"
      ],
      subscribers: [
        "./subscriber/*.js" 
      ],
      cli: {
        migrationsDir: './migration',
      },
      synchronize: true,
      logging: false,
      charset: "utf8mb4_unicode_ci"
    })
    logger.debug("SUCCEED: DATABASE CREATED CONNECTION");
    
    return connection;
  }
  catch (error) {
    logger.error("ERROR: DATABASE CREATED CONNECTION UNSUCESSFULLY");
    logger.error(error);
    return null;
  }
}

export default ormInit;