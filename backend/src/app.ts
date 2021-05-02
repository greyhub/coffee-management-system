import express, {Express} from 'express';
import responseTime from 'response-time';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import STATUS_CODE from './const/status';
import ERR_CODE from "./const/error";
import logger from './_base/log/logger4js';
import sendResAppJson from './dto/response/sendResAppJson';
import globalErrorMiddleware from './error/globalErrorMiddleware';
import CustomError from './error/customError';
import env from './env';
import employeeRoute from './route/employeeRoute';
import accountRoute from './route/accountRoute';
import productRoute from './route/productRoute';
import orderRoute from './route/orderRoute';
import transactionRoute from './route/transactionRoute';
import * as path from 'path';

const app: Express = express();

/**
 * Library Middleware
 */
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// logger.debug("DIR" + path.relative(__dirname, '/static'));
/**
 * TODO: Can be fail when deploy
 */
app.use('/static',express.static("static"));
app.use('/public',express.static("public"));

/**
 * Log response time
 */
app.use(responseTime((req: any, res: any, time: number) => {
  logger.info(req.method + " " + "localhost:" + env.PORT + req.url + " in " + time.toFixed(3) + "ms");
}))

/**
 * Business logic
 */
app.use(employeeRoute);
app.use(accountRoute);
app.use(productRoute);
app.use(orderRoute);
app.use(transactionRoute);

/**
 * For testing
 */
app.get('/testok', (req, res) => {
  sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK);
})
app.get('/testerror', (req, res) => {
  throw new CustomError(STATUS_CODE.INTERNAL_SERVER_ERROR, ERR_CODE.INTERNAL_SERVER_ERROR, "testerror", {"name": 2, 3: 111}, 2);
})


/**
 * Handle Global Error (Custom Error and Not Control Error)
 */
app.use(globalErrorMiddleware);
/**
 * Handle route that is not in router
 */
app.all('*', (req, res) => {
  sendResAppJson(res, STATUS_CODE.NOT_FOUND, ERR_CODE.NOT_FOUND);
})

export default app;