import ERR_CODE from "../const/error";
import stringUtil from "../util/stringUtil";

class ValidatorSignIn {
  private static _instance: ValidatorSignIn
  private constructor() {
  }
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public isValidSignIn(e: any) {
    if (!stringUtil.isValidString(e.account, 6, 20)) {
      return ERR_CODE.ACCOUNT_INVALID_ACCOUNT;
    }
    if (!stringUtil.isValidString(e.password, 6, 20)) {
      return ERR_CODE.ACCOUNT_WRONG_PASSWORD;
    }
    return ERR_CODE.OK;
  }
}

export default ValidatorSignIn.Instance