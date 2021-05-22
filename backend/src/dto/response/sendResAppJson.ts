import ERR_CODE from "../../const/error";
import STATUS_CODE from "../../const/status";
import objectUtil from "../../util/objectUtil";
import logger from "../../_base/log/logger4js";
import ErrorDTO from "../errorDTO";

const sendResAppJson = (res: any, status: STATUS_CODE, error: ERR_CODE, body?: any) => {
  res.type('application/json');
  let output;
  let message = objectUtil.getKeyByValue(ERR_CODE, error);
  if (body && typeof body === "object") {
    output = body;
  }
  else {
    output = new ErrorDTO();
  }
  output.error = error;
  output.message = message;

  logger.info('OUTPUT: ' + JSON.stringify(output));
  return res.status(status).json(output);
}

export default sendResAppJson;