import AuthorGroupRole from "../config/authorGroupRoleConfig";

export default function cheatRoleMiddleware(req: any, res: any, next: any) {
  const roleCode = AuthorGroupRole.ROOT;
  res.locals.roleCode = roleCode;
  next();
}