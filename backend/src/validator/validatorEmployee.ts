import validator from "validator";
import ERR_CODE from "../const/error";
import validatorUtil from "../util/validatorUtil";

class ValidatorEmployee {
  private static _instance: ValidatorEmployee
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  private isValidName(name: any) {
    return name && typeof name === "string" && validator.isLength(name.trim(), {min: 1, max: 50});
  }
  private isValidCCCD(cccd: any) {
    return validatorUtil.isCCCD(cccd);
  }

  public isEmployee(e: any) {
    if (!this.isValidName(e.name)) {
      return ERR_CODE.EMPLOYEE_INVALID_NAME;
    }
    if (!this.isValidCCCD(e.cccd)) {
      return ERR_CODE.EMPLOYEE_INVALID_CCCD;
    }
    return ERR_CODE.OK
  }
}

export default ValidatorEmployee.Instance