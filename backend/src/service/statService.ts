import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import statDAO from "../dao/statDAO";
import employeeDAO from "../dao/employeeDAO";
import CustomError from "../error/customError";
import dateUtil from "../util/dateUtil";
import logger from "../_base/log/logger4js";
import productDAO from "../dao/productDAO";
import { ProductEntity } from "../entity/productEntity";
import EmployeeItemFindDTO from "../dto/employee/employeeItemFindDTO";
import ProductItemFindDTO from "../dto/product/productItemFindDTO";

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
      endDate.setHours(23, 59, 59, 99);

      //Compute Diff Days Betweens
      const ONE_DAY = 24 * 60 * 60 * 1000;
      const diffDays = Math.floor(Math.abs((endDate.getTime() - startDate.getTime()) / ONE_DAY));

      const orders = await statDAO.filterOrderByTime(startDate, endDate);
      if (endDate.getTime() < startDate.getTime()) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.STAT_END_LESS_THAN_START);
      }
      if (diffDays > 365*2) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.STAT_OVER_LIMIT_TWO_YEARS);
      }
      const result = new Array<number>(diffDays + 1);
      for (let i = 0; i < result.length; i++) {
        result[i] = 0;
      }

      //Reduce result
      const startTime = startDate.getTime();
      for (let i = 0; i < orders.length; i++) {
        const o = orders[i];
        const indexDay = Math.floor(Math.abs((o.updateAt.getTime() - startTime) / ONE_DAY));
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

  async viewRevenueProduct(start: string, end: string) {
    try {
      //Gen Date
      const startDate = dateUtil.fromString(start);
      const endDate = dateUtil.fromString(end);
      endDate.setHours(23, 59, 59, 99);

      //Compute Diff Days Betweens
      const ONE_DAY = 24 * 60 * 60 * 1000;
      const diffDays = Math.floor(Math.abs((endDate.getTime() - startDate.getTime()) / ONE_DAY));

      let rrProduct = await statDAO.filterProductRevenueByTime(startDate, endDate);
      if (endDate.getTime() < startDate.getTime()) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.STAT_END_LESS_THAN_START);
      }
      if (diffDays > 365*2) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.STAT_OVER_LIMIT_TWO_YEARS);
      }
      const result = new Map<string, {counts: Array<number>, metadata: ProductItemFindDTO}>();
      if (!rrProduct) {
        rrProduct = [];
      }

      //Init result
      const products = await productDAO.getAll();
      for (let i = 0; i < products.length; i++) {
        const arr = new Array<number>(diffDays + 1);
        for (let j = 0; j < arr.length; j++) {
          arr[j] = 0;
        }
        result.set(products[i].id.toString(), {counts: arr, metadata: new ProductItemFindDTO(products[i])});
      }

      //Reduce result
      /**
       * @var: rrProduct: `pd.id, op.count, od.updateAt`[]
       */
      const startTime = startDate.getTime();
      for (let i = 0; i < rrProduct.length; i++) {
        const o = rrProduct[i];
        if (!o || !o.id || !o.count || !o.updateAt) continue;
        const indexDay = Math.floor(Math.abs((o.updateAt.getTime() - startTime) / ONE_DAY));
        if (indexDay < diffDays + 1) {
          const arr = result.get(o.id);
          if (!arr) continue;
          arr.counts[indexDay] += Number(o.count);
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

  async viewOrderEmployeeByTime(start: string, end: string) {
    try {
      //Gen Date
      const startDate = dateUtil.fromString(start);
      const endDate = dateUtil.fromString(end);
      endDate.setHours(23, 59, 59, 99);

      //Compute Diff Days Betweens
      const ONE_DAY = 24 * 60 * 60 * 1000;
      const diffDays = Math.floor(Math.abs((endDate.getTime() - startDate.getTime()) / ONE_DAY));

      let orders = await statDAO.filterOrderByTime(startDate, endDate);
      if (endDate.getTime() < startDate.getTime()) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.STAT_END_LESS_THAN_START);
      }
      if (diffDays > 365*2) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.STAT_OVER_LIMIT_TWO_YEARS);
      }
      const result = new Map<string, {counts: Array<number>, money: Array<number>, metadata: EmployeeItemFindDTO}>();
      if (!orders) {
        orders = [];
      }

      //Init result
      const employees = await employeeDAO.getAll();
      for (let i = 0; i < employees.length; i++) {
        const mapping = {
          counts: new Array<number>(diffDays + 1),
          money: new Array<number>(diffDays + 1),
          metadata: new EmployeeItemFindDTO(employees[i])
        }
        for (let j = 0; j < diffDays + 1; j++) {
          mapping.counts[j] = 0;
          mapping.money[j] = 0;
        }
        result.set(employees[i].id.toString(), mapping);
      }

      //Reduce result
      const startTime = startDate.getTime();
      for (let i = 0; i < orders.length; i++) {
        const o = orders[i];
        const indexDay = Math.floor(Math.abs((o.updateAt.getTime() - startTime) / ONE_DAY));
        if (indexDay < diffDays + 1) {
          const mapping = result.get(o.employee.id);
          if (!mapping) continue;
          mapping.counts[indexDay] += 1;
          mapping.money[indexDay] += o.money;
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

  async viewRevenueCostNowMonth() {
    try {
      const nowDate = new Date();
      nowDate.setHours(nowDate.getHours()+7)
      const month = nowDate.getMonth();
      const year = nowDate.getFullYear();
      const startDateMonth = new Date(year, month, 1);
      logger.debug("startDateMonth" + startDateMonth + "nowDate" + nowDate);

      const res = {
        "revenue": 0,
        "cost":0
      }
      const result = await statDAO.getRevenueCost(startDateMonth, nowDate);
      if (!result || result.length < 1) {
        return res;
      }
      res.revenue = result[0].revenue;
      res.cost = result[0].cost;
      if (!result[0].revenue) {
        res.revenue = 0;
      }
      if (!result[0].cost) {
        res.cost = 0;
      }
      return res;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.STAT_GET_REVENUE_COST_ERROR);
    }
  }
}

export default StatService.Instance