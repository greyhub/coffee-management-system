import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import statDAO from "../dao/statDAO";
import employeeDAO from "../dao/employeeDAO";
import transactionDAO from "../dao/transactionDAO";
import CustomError from "../error/customError";
import dateUtil from "../util/dateUtil";
import logger from "../_base/log/logger4js";
import { OrderEntity } from "../entity/orderEntity";

class StatService {
  private static _instance: StatService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  async viewRevenue(start: string, end: string) {
    try {

      //Gen Date
      const startDate = dateUtil.fromString(start);
      const endDate = dateUtil.fromString(end);

      //Compute Diff Days Betweens
      const ONE_DAY = 24 * 60 * 60 * 1000;
      const diffDays = Math.floor(Math.abs((endDate.getTime() - startDate.getTime() + 0.1) / ONE_DAY));

      const orders = await statDAO.filterOrderByTime(startDate, endDate);
      const result = new Array<number>(diffDays + 1);
      for (let i = 0; i < result.length; i++) {
        result[i] = 0;
      }

      //Reduce result
      const startTime = startDate.getTime();
      for (let i = 0; i < orders.length; i++) {
        const o = orders[i];
        const indexDay = Math.floor(Math.abs((o.updateAt.getTime() - startTime + 0.1) / ONE_DAY));
        if (indexDay < result.length) {
          result[indexDay] += o.money;
        }
      }
      return result;
    }
    catch(e) {
      if (e instanceof QueryFailedError) {
        logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.STAT_GET_REVENUE_ERROR);
    }
  }
}

export default StatService.Instance