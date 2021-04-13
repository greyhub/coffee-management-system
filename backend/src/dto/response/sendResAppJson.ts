import ERR_CODE from "../../const/error";
import STATUS_CODE from "../../const/status";
import AbstractDTO from "../abstractDTO";
import objectUtil from "../../util/objectUtil";
import logger from "../../_base/log/logger4js";
import GeneralSuccessResponse from "./generalSuccessResponse";
import GeneralErrorResponse from "./generalErrorResponse";

const sendResAppJson = (res: any, status: STATUS_CODE, error: ERR_CODE, body?: AbstractDTO) => {
  res.type('application/json');
  let output;
  if (body && body instanceof AbstractDTO) {
    output = new GeneralSuccessResponse({
      error: error,
      body: body
    })
  }
  else {
    output = new GeneralErrorResponse({
      error: error,
      message: objectUtil.getKeyByValue(ERR_CODE, error).toString()
    })
  }
  logger.info('OUTPUT: ' + JSON.stringify(output));
  return res.status(status).json(output);
}

export default sendResAppJson;