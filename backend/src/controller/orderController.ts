import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import OrderCreateDTO from "../dto/order/orderCreateDTO";
import orderService from "../service/orderService"
import sendResAppJson from "../dto/response/sendResAppJson";
import ValidatorOrer from "../validator/validatorOrder";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";
import OrderListFindDTO from "../dto/order/orderListFindDTO";
import OrderDeleteDTO from "../dto/order/orderDeleteDTO";
import OrderItemFindDTO from "../dto/order/orderItemFindDTO";

class OrderController extends AbstractController {
  private static _instance: OrderController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async getByImporterId(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:')
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.EMPLOYEE_INVALID_ID);
      }
      const orders = await orderService.getByImporterId(req.body.id);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new OrderListFindDTO(orders));
    }
    catch(error) {
      next(error)
    }
  }
  // public async getById(req: any, res: any, next: any) {
  //   try {
  //     logger.info('INPUT:')
  //     if (!req.body.id) {
  //       throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_INVALID_ID);
  //     }
  //     const orders = await orderService.getById(req.body.id);
  //     sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new OrderItemFindDTO(orders));
  //   }
  //   catch(error) {
  //     next(error)
  //   }
  // }

  public async getAll(req: any, res: any, next: any) {
    try {
      const orders = await orderService.getAll();
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new OrderListFindDTO(orders));
    }
    catch(error) {
      next(error)
    }
  }
  public async delete(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));
      
      const nb = await orderService.delete(req.body.ids);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new OrderDeleteDTO(nb));
    }
    catch(error) {
      next(error)
    }
  }
  public async updateInfo(req: any, res: any, next: any) {
    logger.info('INPUT:');
    try {
      logger.info('INPUT:');
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = ValidatorOrer.isOrder(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode <= Number(req.body.roleCode)) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }
      logger.info('INPUT:');

      const order = await orderService.updateInfo(req.body);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new OrderCreateDTO(order));
    }
    catch(error) {
      next(error)
    }
  }
  public async createOne(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = ValidatorOrer.isOrder(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode <= Number(req.body.roleCode)) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }


      const order = await orderService.createOne(req.body);
      // logger.info("dkm: "+ order.orderProducts.toString())
      
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new OrderCreateDTO(order));
    }
    catch(error) {
      next(error)
    }
  }
}

export default OrderController.Instance