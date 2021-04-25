import AuthorGroupRole from "../config/authorGroupRoleConfig"
import employeeAuthorConfig from "../config/employeeAuthorConfig";

const resource: string = employeeAuthorConfig;

export default function cheatRoleMiddleware(req: any, res: any, next: any) {
  const roleCode = AuthorGroupRole.ROOT;
  res.locals.roleCode = roleCode;
  next();
}