import validator from "validator";
import ERR_CODE from "../const/error";
import validatorUtil from "../util/validatorUtil";

class ValidatorProduct {
  private static _instance: ValidatorProduct
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  private isValidName(name: any, min: number = 1, max: number = 250) {
    return name && typeof name === "string" && validator.isLength(name.trim(), {min: min, max: max});
  }
  private isValidCCCD(cccd: any) {
    return validatorUtil.isCCCD(cccd);
  }

  public isProduct(e: any) {
    if (!this.isValidName(e.firstName, 0) || !this.isValidName(e.lastName)) {
      return ERR_CODE.EMPLOYEE_INVALID_NAME;
    }
    if (!this.isValidCCCD(e.cccd)) {
      return ERR_CODE.EMPLOYEE_INVALID_CCCD;
    }
    return ERR_CODE.OK
  }
}

export default ValidatorProduct.Instance