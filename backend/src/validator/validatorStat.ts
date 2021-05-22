import ERR_CODE from "../const/error";
import dateUtil from "../util/dateUtil";
import stringUtil from "../util/stringUtil";

class ValidatorStat {
  private static _instance: ValidatorStat
  private constructor() {
  }
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public isValidViewRevenue(t: any) {
    if (!dateUtil.isValidDate(t.start)) {
      return ERR_CODE.STAT_EXPECT_START_DATE;
    }
    if (!dateUtil.isValidDate(t.end)) {
      return ERR_CODE.STAT_EXPECT_END_DATE;
    }
    return ERR_CODE.OK;
  }
}

export default ValidatorStat.Instance