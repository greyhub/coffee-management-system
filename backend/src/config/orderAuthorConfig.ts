import authorConfig from "../_base/author/authorConfig";
import AuthorGroupRole from "./authorGroupRoleConfig";

const RESOURCE = "order";

const orderAuthorConfig = {
  "create": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.EMPLOYEE,
    AuthorGroupRole.ROOT,
  ],
  "getAll": [
    AuthorGroupRole.ADMIN,
    // AuthorGroupRole.EMPLOYEE,
    AuthorGroupRole.ROOT,
  ],
  "delete": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.EMPLOYEE,
    AuthorGroupRole.ROOT,
  ],
  "update": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.EMPLOYEE,
    AuthorGroupRole.ROOT,
  ],
  "getById": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.EMPLOYEE,
    AuthorGroupRole.ROOT,
  ]
}

authorConfig.addConfig(orderAuthorConfig, RESOURCE)

export default RESOURCE