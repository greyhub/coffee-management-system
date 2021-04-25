import validator from "validator";
import ERR_CODE from "../const/error";
import stringUtil from "../util/stringUtil";
import numberUtil from "../util/numberUtil";
import dateUlti from "../util/dateUtil"

class ValidatorProduct {
  private static _instance: ValidatorProduct
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public isOrder(e: any) {
    if (!dateUlti.isValidDateTimeBeforeNow(e.updateAt)) {
      return ERR_CODE.ORDER_INVALID_DATE;
    }
    if (!numberUtil.isOnlyDigits(e.money)) {
      return ERR_CODE.ORDER_INVALID_MONEY;
    }
    if (!numberUtil.isOnlyDigits(e.tableCode)) {
      return ERR_CODE.ORDER_INVALID_TABEL_CODE;
    }
    if (!stringUtil.isValidString(e.note,0,3000)){
      return ERR_CODE.ORDER_INVALID_NOTE;
    }
    return ERR_CODE.OK
  }
}

export default ValidatorProduct.Instance