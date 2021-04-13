import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import sendResAppJson from "../dto/response/sendResAppJson";
import CustomError from "./customError";

const globalErrorMiddleware: any = (err: CustomError, req: any, res: any, next: any) => {
  if (err instanceof CustomError) {
    sendResAppJson(res, err.status, err.error);
  }
  else {
    sendResAppJson(res, STATUS_CODE.INTERNAL_SERVER_ERROR, ERR_CODE.INTERNAL_SERVER_ERROR);
    throw err;
  }
}

export default globalErrorMiddleware;