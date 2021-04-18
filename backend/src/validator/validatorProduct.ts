import validator from "validator";
import ERR_CODE from "../const/error";
import businessUtil from "../util/businessUtil";
import stringUtil from "../util/stringUtil";
class ValidatorProduct {
  private static _instance: ValidatorProduct
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public isProduct(e: any) {
    if (!stringUtil.isValidString(e.firstName, 0) || !stringUtil.isValidString(e.lastName)) {
      return ERR_CODE.EMPLOYEE_INVALID_NAME;
    }
    if (!businessUtil.isCCCD(e.cccd)) {
      return ERR_CODE.EMPLOYEE_INVALID_CCCD;
    }
    return ERR_CODE.OK
  }
}

export default ValidatorProduct.Instance