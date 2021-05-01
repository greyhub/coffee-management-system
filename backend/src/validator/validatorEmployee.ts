import AuthorGroupRole from "../config/authorGroupRoleConfig";
import ERR_CODE from "../const/error";
import businessUtil from "../util/businessUtil";
import dateUtil from "../util/dateUtil";
import numberUtil from "../util/numberUtil";
import stringUtil from "../util/stringUtil";

class ValidatorEmployee {
  private static _instance: ValidatorEmployee
  private constructor() {
  }
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private isValidRoleCode(roleCode: any) {
    return roleCode != null && Object.values(AuthorGroupRole).includes(Number(roleCode));
  }
  private isValidAccount(account: any, min: number= 6, max: number = 20) {
    return stringUtil.isValidString(account, 6, 20) &&  account.match(/^[0-9a-zA-Z]+$/)
  }

  public isValidEmployee(e: any) {
    if (!e || !stringUtil.isValidString(e.firstName, 0) || !stringUtil.isValidString(e.lastName)) {
      return ERR_CODE.EMPLOYEE_INVALID_NAME;
    }
    if (!stringUtil.isValidString(e.address, 0, 255)) {
      return ERR_CODE.EMPLOYEE_INVALID_ADDRESS;
    }
    if (!stringUtil.isValidString(e.position, 1)) {
      return ERR_CODE.EMPLOYEE_INVALID_POSITION;
    }
    if (!this.isValidAccount(e.account, 6, 20)) {
      return ERR_CODE.EMPLOYEE_INVALID_ACCOUNT;
    }
    if (!stringUtil.isValidString(e.password, 6, 20)) {
      return ERR_CODE.EMPLOYEE_INVALID_PASSWORD;
    }
    if (!this.isValidRoleCode(e.roleCode)) {
      return ERR_CODE.EMPLOYEE_INVALID_ROLE;
    }
    if (!businessUtil.isCCCD(e.cccd)) {
      return ERR_CODE.EMPLOYEE_INVALID_CCCD;
    }
    if (!dateUtil.isValidDateBeforeNow(e.birthday)) {
      return ERR_CODE.EMPLOYEE_INVALID_BIRTHDAY;
    }
    if (!dateUtil.isValidDate(e.joinDate)) {
      return ERR_CODE.EMPLOYEE_INVALID_JOIN_DATE;
    }
    if (!dateUtil.isValidDate(e.expireDate)) {
      return ERR_CODE.EMPLOYEE_INVALID_EXPIRE_DATE;
    }
    return ERR_CODE.OK
  }
  public isValidEmployeeWhenUpdate(e: any) {
    if (!e || !stringUtil.isValidString(e.firstName, 0) || !stringUtil.isValidString(e.lastName)) {
      return ERR_CODE.EMPLOYEE_INVALID_NAME;
    }
    if (!stringUtil.isValidString(e.address, 0, 255)) {
      return ERR_CODE.EMPLOYEE_INVALID_ADDRESS;
    }
    if (!stringUtil.isValidString(e.position, 1)) {
      return ERR_CODE.EMPLOYEE_INVALID_POSITION;
    }
    if (!this.isValidAccount(e.account, 6, 20)) {
      return ERR_CODE.EMPLOYEE_INVALID_ACCOUNT;
    }
    if (!this.isValidRoleCode(e.roleCode)) {
      return ERR_CODE.EMPLOYEE_INVALID_ROLE;
    }
    if (!businessUtil.isCCCD(e.cccd)) {
      return ERR_CODE.EMPLOYEE_INVALID_CCCD;
    }
    if (!dateUtil.isValidDateBeforeNow(e.birthday)) {
      return ERR_CODE.EMPLOYEE_INVALID_BIRTHDAY;
    }
    if (!dateUtil.isValidDate(e.joinDate)) {
      return ERR_CODE.EMPLOYEE_INVALID_JOIN_DATE;
    }
    if (!dateUtil.isValidDate(e.expireDate)) {
      return ERR_CODE.EMPLOYEE_INVALID_EXPIRE_DATE;
    }
    return ERR_CODE.OK
  }
}

export default ValidatorEmployee.Instance