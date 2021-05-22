import logger from "../../_base/log/logger4js";
import AbstractDTO from "../abstractDTO";

export default class Stat24hDTO extends AbstractDTO {
  private type: string
  private revenue: any

  constructor(revenue: any, type: string = "hour") {
    super();
    logger.debug("hoicham",revenue)
    this.type = type;
    this.revenue = revenue;
    logger.debug("hoicham2",this.revenue)
  }
}