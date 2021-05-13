import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import employeeDAO from "../dao/employeeDAO";
import transactionDAO from "../dao/transactionDAO";
import CustomError from "../error/customError";
import dateUtil from "../util/dateUtil";
import logger from "../_base/log/logger4js";

class TransactionService {
  private static _instance: TransactionService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  private async generateTransactionId() {
    let maxId = await transactionDAO.getMaxTransactionId();
    if (!maxId) {
      maxId = "TS-000000";
    }
    const arr = maxId.split("-");
    let nextId = (parseInt(arr[1], 10) + 1).toString().padStart(6, "0");
    return arr[0] + "-" + nextId.toString();
  }

  public async getById(id: string) {
    try {
      const t = await transactionDAO.getById(id);
      if (!t) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.TRANSACTION_GET_BY_ID_ERROR);
      }
      return t;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.TRANSACTION_GET_BY_ID_ERROR);
    }
  }
  public async getAll() {
    const ts = await transactionDAO.getAll();
    return ts;
  }
  public async delete(ids: Array<string>) {
    try {
      const ts = await transactionDAO.deleteByIds(ids);
      // const deletedIds = ts.map((t) => t.id);
      // logger.debug("Delete" + JSON.stringify(ts));
      return ids;
    }
    catch {
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.TRANSACTION_DELETE_ERROR);
    }
  }
  public async createOne(t: any) {
    try {
      // Generate Next Ids
      const nextId = await this.generateTransactionId();
      logger.debug("GENERATE" + nextId);

      // Gen Date
      t.time = dateUtil.fromString(t.time);

      // Get Employee Entity
      const employee = await employeeDAO.getById(t.importerId);
      if (!employee) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.TRANSACTION_INVALID_IMPORTER);
      }

      // Create Transaction to save
      let newT = transactionDAO.create({
        id: nextId,
        materialName: t.materialName,
        description: t.description,
        count: t.count,
        price: t.price,
        supplierName: t.supplierName,
        time: t.time,
        employee: employee
      });

      // Save Transaction in database
      newT = await transactionDAO.save(newT);
      return newT;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.TRANSACTION_CREATE_ERROR);
    }
  }
  public async updateInfo(transaction: any) {
    try {
      // Gen Date
      transaction.time = dateUtil.fromString(transaction.time);

      // Get Transaction by Id input
      const t = await transactionDAO.getById(transaction.id);

      if (t) { 
        const employee = await employeeDAO.getById(transaction.importerId);
        if (!employee) {
          throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.TRANSACTION_INVALID_IMPORTER);
        }

        let newT: any = {
          id: t.id,
          time: transaction.time,
        };
        if (transaction.importerId && t.employee.id.toString() != transaction.importerId.toString()) {
          newT.employee = employee;
        }
        if (t.description.toString() != transaction.description.toString()) {
          newT.description = transaction.description;
        }
        if (t.price.toString() != transaction.price.toString()) {
          newT.price = transaction.price;
        }
        if (t.supplierName.toString() != transaction.supplierName.toString()) {
          newT.supplierName = transaction.supplierName;
        }
        if (t.materialName.toString() != transaction.materialName.toString()) {
          newT.materialName = transaction.materialName;
        }
        if (t.count.toString() != transaction.count.toString()) {
          newT.count = transaction.count;
        }
        await transactionDAO.update(newT);
        let newEntity = await this.getById(t.id);
        return newEntity;
      }
      else {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.TRANSACTION_UPDATE_ERROR);
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.TRANSACTION_UPDATE_ERROR);
    }
  }
}

export default TransactionService.Instance