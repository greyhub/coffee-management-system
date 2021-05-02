import "reflect-metadata";
import {createConnection} from "typeorm";
import env from "./env";
import * as path from 'path';
import logger from "./_base/log/logger4js";
import { EmployeeEntity } from "./entity/employeeEntity";
import { OrderEntity } from "./entity/orderEntity";
import { OrderProductEntity } from "./entity/orderProductEntity";
import { ProductEntity } from "./entity/productEntity";
import { TransactionEntity } from "./entity/transactionEntity";
import { join } from "node:path";

const ormInit = async (callback: Function) => {
  try {
    const connection = await createConnection({
      type: "mysql",
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      entities: [
        __dirname + '/../**/*'
      ],
      migrations: [
        "./migrations/*" 
      ],
      subscribers: [
        "./subscriber/*" 
      ],
      cli: {
        migrationsDir: './migration',
      },
      synchronize: true,
      logging: false,
      charset: "utf8mb4_unicode_ci"
    })
    logger.debug("SUCCEED: DATABASE CREATED CONNECTION");
    callback();
    return connection;
  }
  catch (error) {
    logger.error("ERROR: DATABASE CREATED CONNECTION UNSUCESSFULLY");
    logger.error(error);
    return null;
  }
}

export default ormInit;