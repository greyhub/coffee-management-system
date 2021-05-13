import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import sendResAppJson from "../dto/response/sendResAppJson";
import statOrderEmployeeDTO from "../dto/stat/statOrderEmployeeDTO";
import StatRevenueDTO from "../dto/stat/statRevenueDTO";
import StatRevenueProductDTO from "../dto/stat/statRevenueProductDTO";
import CustomError from "../error/customError";
import statService from "../service/statService";
import validatorStat from "../validator/validatorStat";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";

class StatController extends AbstractController {
  private static _instance: StatController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async viewRevenue(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = validatorStat.isValidViewRevenue(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      const stat = await statService.viewRevenue(req.body.start, req.body.end);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new StatRevenueDTO(stat));
    }
    catch(error) {
      next(error)
    }
  }

  public async viewRevenueProduct(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = validatorStat.isValidViewRevenue(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      const stat = await statService.viewRevenueProduct(req.body.start, req.body.end);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new StatRevenueProductDTO(stat));
    }
    catch(error) {
      next(error)
    }
  }

  public async viewOrderEmployeeByTime(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = validatorStat.isValidViewRevenue(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      const stat = await statService.viewOrderEmployeeByTime(req.body.start, req.body.end);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new statOrderEmployeeDTO(stat));
    }
    catch(error) {
      next(error)
    }
  }
}

export default StatController.Instance