import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import CustomError from "../error/customError";
import authorConfig from "../_base/author/authorConfig"
import transactionAuthorConfig from "../config/transactionAuthorConfig";
import serverConfig from "../config/serverConfig";

const resource: string = transactionAuthorConfig;

export default function authTransactionMiddleware(permission: string) {
  return function authMiddleware(req: any, res: any, next: any) {
    if (!serverConfig.shouldAuth) {
      next();
      return;
    }

    const roleCode = res.locals.roleCode;

    const isAllow = authorConfig.isAuthorized(resource, [roleCode], permission);
    if (!isAllow) {
      next(new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.FORBIDDEN))
    }
    else {
      next()
    }
  }
}