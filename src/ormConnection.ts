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
        "./src/entity/*.ts"
      ],
      migrations: [
        "./src/migration/*.ts"
      ],
      subscribers: [
        "./src/subscriber/*.ts" 
      ],
      cli: {
        migrationsDir: 'src/migration',
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