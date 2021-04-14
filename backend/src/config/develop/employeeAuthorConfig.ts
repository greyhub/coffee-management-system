import authorConfig from "../../_base/author/authorConfig";
import AuthorGroupRole from "../../_base/author/authorGroupRole";

const resource = "employee"

const employeeAuthorConfig = {
  "employeecreate": [
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

authorConfig.setConfig(employeeAuthorConfig, resource)

export default resource