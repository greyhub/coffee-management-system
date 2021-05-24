import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from '../const/status';
import orderDAO from '../dao/orderDAO'
import CustomError from '../error/customError';
import logger from "../_base/log/logger4js";
import dateUtil from "../util/dateUtil";
import { OrderEntity } from "../entity/orderEntity";
import employeeDAO from "../dao/employeeDAO";
import orderProductDAO from "../dao/orderProductDAO";
import OrderProductService from "./orderProductService";
import orderProductService from "./orderProductService";
import { OrderProductEntity } from "../entity/orderProductEntity";
import statDAO from "../dao/statDAO";

class OrderService {
  private static _instance: OrderService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async getById(id: string) {
    try {
      const order = await orderDAO.getById(id);
      // if(!orders){
      //   throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_GET_BY_ID_ERROR);
      // }
      // const order = orders[0];
      // logger.debug("upda"+ order?.id)
      if (!order) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_GET_BY_ID_ERROR);
      }
      return order;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_GET_BY_ID_ERROR);
    }
  }
  public async getByImporterId(id: string) {
    try {
      // logger.info('INPUT1:')
      const orders = await orderDAO.getByImporterId(id);
      // logger.info('INPUT:')
      if (!orders) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_GET_BY_IMPORTER_ID_ERROR);
      }
      return orders;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_GET_BY_IMPORTER_ID_ERROR);
    }
  }
  public async getAll() {
    const orders = await orderDAO.getAll();
    return orders;
  }
  public async createOne(e: any) {
    try {
      // Create Product to save
      let newOrder = new OrderEntity();

      let newemployee = await employeeDAO.getById(e.importerId);
      if (!newemployee){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_CREATE_ERROR);
      }
      let neworderProducts =  Array<OrderProductEntity>();
      newOrder.updateAt = dateUtil.fromTimeString(e.updateAt),
      newOrder.employee = newemployee,
      newOrder.note = e.note,
      newOrder.money = e.money,
      newOrder.tableCode = e.tableCode,
      newOrder.orderProducts = neworderProducts,
      // Save product in database
      newOrder = await orderDAO.save(newOrder);
      if(!newOrder){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_CREATE_ERROR);
      }
      // await logger.debug("saveorder: "+e.orderProducts[0].product + ", "+ e.orderProducts[0].count);
      newOrder.orderProducts = await orderProductService.saveMany(e.orderProducts,newOrder);
      
      // await logger.debug("saveorderafter: "+newOrder.orderProducts[0].product + ", "+ newOrder.orderProducts[0].count);
      if (!newOrder.orderProducts){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_CREATE_ERROR);
      }
      return newOrder;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_CREATE_ERROR);
    }
  }
  public async updateInfo(order: any) {
    try {
      
      const e = await orderDAO.getById(order.id);
      // if (!en){
      //   throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_GET_BY_ID_ERROR);
      // }
      // const e = en[0] 
      if (e) {

        let newOrder = new OrderEntity();
        
        let newemployee = await employeeDAO.getById(order.importerId);

        if (!newemployee){
          throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_UPDATE_ERROR);
        }
        await this.delete([e.id])
        let neworderProducts =  Array<OrderProductEntity>();
        newOrder.id = e.id,
        newOrder.updateAt = dateUtil.fromTimeString(order.updateAt),
        newOrder.employee = newemployee,
        newOrder.note = order.note,
        newOrder.money = order.money,
        newOrder.tableCode = order.tableCode,
        newOrder.orderProducts = neworderProducts,
        // Save product in database
        newOrder = await orderDAO.save(newOrder);
        // await logger.debug("update2")
        if (!newOrder){
          throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_UPDATE_ERROR);
        }
        // await logger.debug("saveorder: "+e.orderProducts[0].product + ", "+ e.orderProducts[0].count);
        newOrder.orderProducts = await orderProductService.saveMany(order.orderProducts,newOrder);
        // await logger.debug("update3")
        // logger.debug("clm: "+JSON.stringify(newOrder.orderProducts))
        // await logger.debug("saveorderafter: "+newOrder.orderProducts[0].product + ", "+ newOrder.orderProducts[0].count);
        if (!newOrder.orderProducts){
          throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_UPDATE_ERROR);
        }
        // await orderDAO.update(newOrder);
        // await logger.debug("update4 "+ e.id)
        let thisOrder = await this.getById(e.id);
        if (!thisOrder){
          throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_UPDATE_ERROR);
        }
        thisOrder.orderProducts = newOrder.orderProducts;
        // await logger.debug("update69 "+ JSON.stringify(thisOrder.orderProducts))
        return thisOrder;
      }
      else {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_UPDATE_ERROR);
      }
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_UPDATE_ERROR);
    }
  }
  public async delete(ids: Array<string>) {
    try {
      // logger.debug("Delete1")
      const orders = await orderDAO.deleteByIds(ids);
      // let del = Array.from(orders.affected?.toString());
      let del: any = orders.affected
      // logger.debug("Delete1"+ del)
      let dels: number = del
      // logger.debug("Delete" + orders.affected)
      // const deletedIds = dels.map((e: any) => e.id);
      // const deletedIds = productss;
      
      return dels;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ORDER_DELETE_ERROR);
    }
  }
  
  public async viewRev24h() {
    try {
      const nowTime = new Date();
      let startHour = new Date();
      const hour = nowTime.getHours();
      // logger.debug('TIme:', hour);
      nowTime.setMinutes(0);
      startHour.setHours(nowTime.getHours() - 24);
      // logger.debug('TIme:', startHour);
      // logger.debug('TIme2:', nowTime);
      // Validate input
      const orders = await statDAO.filterOrderByTime(startHour, nowTime);
      const result = new Map()
      // let index = new Array<number>(8);
      // for (let i = 0; i < 8; i++) {
      //   index[i] = 0;
      // }
      const startTime = startHour.getTime();
      const endTime = nowTime.getTime();
      for (let i = 0; i < 8; i++) {
        let curHour = new Date();
        curHour.setHours(nowTime.getHours() - 21 + i*3);
        let hour = curHour.getHours(); 
        let income = 0;
        for (let j = 0; j<orders.length;j++){
          if (curHour.getTime()>orders[j].updateAt.getTime()){
            income += orders[j].money;
          }
        }
        result.set(hour,income);
      }
      const res = Array.from(result.entries())
      // logger.debug("haha",res)
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.STAT_GET_REVENUE_ERROR);
    }
  }
}

export default OrderService.Instance