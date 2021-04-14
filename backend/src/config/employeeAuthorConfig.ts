import authorConfig from "../_base/author/authorConfig";
import AuthorGroupRole from "./authorGroupRoleConfig";

const RESOURCE = "employee";

const employeeAuthorConfig = {
  "create": [
    AuthorGroupRole.ADMIN
  ],
  "getAll": [
    AuthorGroupRole.ADMIN
  ],
  "delete": [
    AuthorGroupRole.ADMIN
  ],
  "update": [
    AuthorGroupRole.ADMIN
  ],
  "updatePassword": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.EMPLOYEE
  ]
}

authorConfig.addConfig(employeeAuthorConfig, RESOURCE)

export default RESOURCE