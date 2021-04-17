import authorConfig from "../_base/author/authorConfig";
import AuthorGroupRole from "./authorGroupRoleConfig";

const RESOURCE = "employee";

const employeeAuthorConfig = {
  "create": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
  ],
  "getAll": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.EMPLOYEE,
    AuthorGroupRole.ROOT,
  ],
  "delete": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
  ],
  "update": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
  ],
  "getById": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.EMPLOYEE,
    AuthorGroupRole.ROOT,
  ],
  "updatePassword": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.EMPLOYEE,
    AuthorGroupRole.ROOT,
  ]
}

authorConfig.addConfig(employeeAuthorConfig, RESOURCE)

export default RESOURCE