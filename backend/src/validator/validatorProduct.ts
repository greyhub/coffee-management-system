import validator from "validator";
import ERR_CODE from "../const/error";
import stringUtil from "../util/stringUtil";
import numberUtil from "../util/numberUtil"

class ValidatorProduct {
  private static _instance: ValidatorProduct
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public isProduct(e: any) {
    if (!stringUtil.isValidString(e.name, 0)) {
      return ERR_CODE.PRODUCT_INVALID_NAME;
    }
    if (!numberUtil.isOnlyDigits(e.price)) {
      return ERR_CODE.PRODUCT_INVALID_PRICE;
    }
    if (!stringUtil.isValidString(e.description,0,3000)){
      return ERR_CODE.PRODUCT_INVALID_DESCRIPTION;
    }
    return ERR_CODE.OK
  }
}

export default ValidatorProduct.Instance