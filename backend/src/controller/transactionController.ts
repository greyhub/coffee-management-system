import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import sendResAppJson from "../dto/response/sendResAppJson";
import TransactionCreateDTO from "../dto/transaction/transactionCreateDTO";
import TransactionDeleteDTO from "../dto/transaction/transactionDeleteDTO";
import TransactionListFindDTO from "../dto/transaction/transactionListFindDTO";
import CustomError from "../error/customError";
import transactionService from "../service/transactionService";
import ValidatorTransaction from "../validator/validatorTransaction";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";

class TransactionController extends AbstractController {
  private static _instance: TransactionController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async getById(req: any, res: any, next: any) {
    try {
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.TRANSACTION_INVALID_ID);
      }
      const t = await transactionService.getById(req.body.id);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new TransactionCreateDTO(t));
    }
    catch(error) {
      next(error)
    }
  }
  public async getAll(req: any, res: any, next: any) {
    try {
      const ts = await transactionService.getAll();
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new TransactionListFindDTO(ts));
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
      
      if (!req.body.ids || !Array.isArray(req.body.ids)) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.TRANSACTION_DELETE_INVALID_IDS);
      }
      const ids = await transactionService.delete(req.body.ids);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new TransactionDeleteDTO(ids));
    }
    catch(error) {
      next(error)
    }
  }
  public async updateInfo(req: any, res: any, next: any) {
    try {
      req.body.importerId = res.locals.id;
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = ValidatorTransaction.isValidTransaction(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.TRANSACTION_INVALID_ID);
      }

      const t = await transactionService.updateInfo(req.body);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new TransactionCreateDTO(t));
    }
    catch(error) {
      next(error)
    }
  }
  public async createOne(req: any, res: any, next: any) {
    try {
      req.body.importerId = res.locals.id;
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = ValidatorTransaction.isValidTransaction(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      const t = await transactionService.createOne(req.body);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new TransactionCreateDTO(t));
    }
    catch(error) {
      next(error)
    }
  }
}

export default TransactionController.Instance