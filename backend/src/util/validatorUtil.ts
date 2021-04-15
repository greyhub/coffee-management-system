import validator from "validator";
import moment from "moment";

class ValidatorUtil {
  private static _instance: ValidatorUtil
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  isOnlyDigits(str: string) {
    return /^\d+$/.test(str);
  }
  isCCCD(cccd: any) {
    return cccd && typeof cccd === "string" && cccd.trim().length === 12 && this.isOnlyDigits(cccd.trim());
  }
  isValidString(str: string, min: number = 1, max: number = 50) {
    return str && typeof str === "string" && validator.isLength(str.trim(), {min: min, max: max});
  }
  isValidDate(str: string, format: string = "DD/MM/YYYY") {
    return str && typeof str === "string" && moment(str, format, true).isValid();
  }
  isValidDateBeforeNow(str: string, format: string = "DD/MM/YYYY", delimiter = "/") {
    const isValid =  str && typeof str === "string" && moment(str, format, true).isValid();

    if (!isValid) {
      return false;
    }
    else {
      const arr = str.split(delimiter);
      const date = new Date(Number(arr[2]), Number(arr[1]), Number(arr[0]));
      return date < new Date();
    }
  }
}

export default ValidatorUtil.Instance;