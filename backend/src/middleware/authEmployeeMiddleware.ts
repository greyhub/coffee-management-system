import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import CustomError from "../error/customError";
import authorConfig from "../_base/author/authorConfig"
import employeeAuthorConfig from "../config/employeeAuthorConfig";
import serverConfig from "../config/serverConfig";

const resource: string = employeeAuthorConfig;

export default function authEmployeeMiddleware(permission: string) {
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