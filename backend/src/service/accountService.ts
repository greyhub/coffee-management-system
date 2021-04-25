import jwt from "jsonwebtoken"
import { QueryFailedError } from "typeorm/error";
import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import env from "../env";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import bcrypt from "bcrypt";
import accountDAO from "../dao/accountDAO";
import TokenDecoded from "../model/TokenDecoded";
import systemUtil from "../util/systemUtil";
import serverConfig from "../config/serverConfig";
import blackTokenDAO from "../dao/blackTokenDAO";

class AccountService {
  private static _instance: AccountService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  private async checkBlackList(token: string) {
    return false;
    return await blackTokenDAO.checkBlackList(token);
  }
  private genTokenByRoleCodePassword(roleCode: number, hashPassword: string) {
    return jwt.sign({
      exp: Math.floor(systemUtil.getUTCTimestampServer() / 1000) + serverConfig.timeoutToken,
      data: new TokenDecoded(roleCode, hashPassword)
    }, env.SECRECT_KEY);
  }
  private decodeToken(token: string) {
    try {
      return jwt.verify(token, env.SECRECT_KEY)
    } catch(err) {
      // expired
      throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_TOKEN_EXPIRED);
    }
  }
  private async comparePassword(password: string, hashPassword: string) {
    try {
      return await bcrypt.compare(password, hashPassword);
    }
    catch (e) {
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ACCOUNT_WRONG_PASSWORD);
    }
  }

  public extractTokenBearerHeader(authorization: any): string {
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      return authorization.split(' ')[1];
    }
    return "";
  }
  public async verifyTokenAndGetRoleCode(token: string) {
    try {
      const payload = this.decodeToken(token);
      if (!payload) {
        throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_INVALID_TOKEN);
      }
      const decoded = (<any>payload).data;

      if (!decoded.roleCode && decoded.roleCode !== 0) {
        throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_INVALID_TOKEN);
      }

      if (await this.checkBlackList(token)) {
        throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_TOKEN_EXPIRED);
      }

      return decoded.roleCode;
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
      throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_INVALID_TOKEN);
    }
  }
  public async hashPassword(password: string) {
    try {
      let salt = bcrypt.genSaltSync(10);
      password = await bcrypt.hash(password, salt);
      return password;
    }
    catch(e) {
      throw e;
    }
  }
  public async signIn(account: string, password: string) {
    try {
      // Kiem tra xem co tai khoan khong
      const employee = await accountDAO.getEmployeeByAccount(account);
      if (!employee) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ACCOUNT_INVALID_ACCOUNT);
      }
      
      const isRightPassword = await this.comparePassword(password, employee.hashPassword);
      if (!isRightPassword) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ACCOUNT_WRONG_PASSWORD);
      }

      // Sinh token de tra ve
      const token = this.genTokenByRoleCodePassword(employee.roleCode, employee.hashPassword);
      return {
        token: token,
        employee: employee
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ACCOUNT_SIGN_IN_ERROR);
    }
  }
  // public async signOut(token: string) {
  //   try {
  //     await blackTokenDAO.addTokenToBlack(token);
  //   }
  //   catch(e) {
  //     if (e instanceof CustomError) {
  //       logger.debug('CustomError');
  //       throw e;
  //     }
  //     throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ACCOUNT_SIGN_OUT_ERROR);
  //   }
  // } 
}

export default AccountService.Instance