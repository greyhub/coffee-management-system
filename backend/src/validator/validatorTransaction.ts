import ERR_CODE from "../const/error";
import dateUtil from "../util/dateUtil";
import stringUtil from "../util/stringUtil";

class ValidatorTransaction {
  private static _instance: ValidatorTransaction
  private constructor() {
  }
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public isValidTransaction(t: any) {
    if (!t || !stringUtil.isValidString(t.description, 1, 2000)) {
      return ERR_CODE.TRANSACTION_INVALID_DESCRIPTION;
    }
    if (!stringUtil.isValidString(t.supplierName, 1, 2000)) {
      return ERR_CODE.TRANSACTION_INVALID_SUPPLIER;
    }
    if (!t.price) {
      return ERR_CODE.TRANSACTION_INVALID_PRICE;
    }
    if (!t.count) {
      return ERR_CODE.TRANSACTION_INVALID_COUNT;
    }
    if (!stringUtil.isValidString(t.materialName, 1, 255)) {
      return ERR_CODE.TRANSACTION_INVALID_MATERIAL_NAME;
    }
    if (!dateUtil.isValidDate(t.time)) {
      return ERR_CODE.TRANSACTION_INVALID_TIME;
    }
    return ERR_CODE.OK;
  }
}

export default ValidatorTransaction.Instance