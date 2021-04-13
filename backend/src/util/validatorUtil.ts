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
}

export default ValidatorUtil.Instance;