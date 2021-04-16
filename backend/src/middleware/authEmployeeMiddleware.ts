import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import CustomError from "../error/customError";
import authorConfig from "../_base/author/authorConfig"
import AuthorGroupRole from "../config/authorGroupRoleConfig"
import employeeAuthorConfig from "../config/employeeAuthorConfig";

const resource: string = employeeAuthorConfig;

export default function authEmployeeMiddleware(permission: string) {
  return function authMiddleware(req: any, res: any, next: any) {
    const isAllow = authorConfig.isAuthorized(resource, [AuthorGroupRole.ADMIN], permission);
    if (!isAllow) {
      next(new CustomError(STATUS_CODE.NOT_FOUND, ERR_CODE.NOT_FOUND))
    }
    else {
      next()
    }
  }
}