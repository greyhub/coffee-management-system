import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import sendResAppJson from "../dto/response/sendResAppJson";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import accountService from "../service/accountService";
import validatorSignIn from "../validator/validatorSignIn";
import AccountSignInDTO from "../dto/accountSignInDTO";
import AbstractController from "./abstractController";

class AccountController extends AbstractController {
  private static _instance: AccountController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async authTokenAndPassRoleCodeToResLocals(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      if (!super.shouldAuth()) {
        next();
        return;
      }

      const employee = await accountService.verifyTokenAndGetEmployee(req.body.token);
      if (employee === null) {
        throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_INVALID_TOKEN);
      }
      res.locals.employee = employee;
      next();
    }
    catch (e) {
      next(e);
    }
  }
  public async signIn(req: any, res: any, next: any) {
    try {
      // Validate
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = validatorSignIn.isValidSignIn(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      const account = req.body.account;
      const password = req.body.password;

      const tokenEmployee = await accountService.signIn(account, password);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new AccountSignInDTO(tokenEmployee.token, tokenEmployee.employee));
    }
    catch(e) {
      next(e);
    }
  }
}

export default AccountController.Instance