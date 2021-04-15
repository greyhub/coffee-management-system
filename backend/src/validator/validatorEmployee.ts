import AuthorGroupRole from "../config/authorGroupRoleConfig";
import ERR_CODE from "../const/error";
import validatorUtil from "../util/validatorUtil";

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
  private isValidAccount(account: any) {
    return validatorUtil.isValidString(account, 6, 20) &&  account.match(/^[0-9a-zA-Z]+$/)
  }

  public isValidEmployee(e: any) {
    if (!validatorUtil.isValidString(e.firstName, 0) || !validatorUtil.isValidString(e.lastName)) {
      return ERR_CODE.EMPLOYEE_INVALID_NAME;
    }
    if (!validatorUtil.isValidString(e.address, 0, 255)) {
      return ERR_CODE.EMPLOYEE_INVALID_ADDRESS;
    }
    if (!validatorUtil.isValidString(e.position, 1)) {
      return ERR_CODE.EMPLOYEE_INVALID_POSITION;
    }
    if (!this.isValidAccount(e.account)) {
      return ERR_CODE.EMPLOYEE_INVALID_ACCOUNT;
    }
    if (!validatorUtil.isValidString(e.password, 6, 20)) {
      return ERR_CODE.EMPLOYEE_INVALID_PASSWORD;
    }
    if (!this.isValidRoleCode(e.roleCode)) {
      return ERR_CODE.EMPLOYEE_INVALID_ROLE;
    }
    if (!validatorUtil.isCCCD(e.cccd)) {
      return ERR_CODE.EMPLOYEE_INVALID_CCCD;
    }
    if (!validatorUtil.isValidDateBeforeNow(e.birthday)) {
      return ERR_CODE.EMPLOYEE_INVALID_BIRTHDAY;
    }
    if (!validatorUtil.isValidDate(e.joinDate)) {
      return ERR_CODE.EMPLOYEE_INVALID_JOIN_DATE;
    }
    if (!validatorUtil.isValidDate(e.expireDate)) {
      return ERR_CODE.EMPLOYEE_INVALID_EXPIRE_DATE;
    }
    return ERR_CODE.OK
  }
}

export default ValidatorEmployee.Instance