import validator from "validator";
import ERR_CODE from "../const/error";
import stringUtil from "../util/stringUtil";
import numberUtil from "../util/numberUtil";
import dateUtil from "../util/dateUtil";

class ValidatorOrder {
  private static _instance: ValidatorOrder
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public isOrder(e: any) {
    if (!stringUtil.isValidString(e.note, 0)) {
      return ERR_CODE.ORDER_INVALID_NOTE;
    }
    if (!stringUtil.isValidString(e.string, 0)) {
      return ERR_CODE.ORDER_INVALID_EMPLOYEEID;
    }
    if (!numberUtil.isOnlyDigits(e.money)) {
      return ERR_CODE.ORDER_INVALID_MONEY;
    }
    if (!numberUtil.isOnlyDigits(e.tableCode)){
      return ERR_CODE.ORDER_INVALID_TABEL_CODE;
    }
    if (!dateUtil.isValidDateBeforeNow(e.updateAt)) {
      return ERR_CODE.ORDER_INVALID_DATE;
    }
    return ERR_CODE.OK
  }
}

export default ValidatorOrder.Instance