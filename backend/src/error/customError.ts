import ERR_CODE from "../const/error";
import objectUtil from "../util/objectUtil";
import logger from '../_base/log/logger4js';

export default class CustomError extends Error {
  status: number;
  error: number;
  constructor(status: number, error: ERR_CODE = ERR_CODE.OK, ...params: any) {
    super();

    Object.setPrototypeOf(this, CustomError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.status = status;
    
    if (error >= 0) {
      this.error = error;
    }
    else {
      this.error = this.status;
    }
    
    this.name = objectUtil.getKeyByValue(ERR_CODE, error).toString();

    const stack = this.stack;// + "\n" + params.toString().replace(/,/g, "\n"));//JSON.stringify(params));
    const moreInfo = params.reduce((accumulator: any, currentValue: any) => accumulator + "\n" + JSON.stringify(currentValue), "");
    logger.error(stack + moreInfo);
  }
}