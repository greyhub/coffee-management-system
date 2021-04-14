import serverConfigDevelop from "./develop/serverConfig.develop.json";
import serverConfigProduct from "./product/serverConfig.product.json";

const ENVIRONMENT_DEVELOP = 0;
const ENVIRONMENT_PRODUCT = 1;

let MODE = ENVIRONMENT_DEVELOP;

function ServerConfig() {
  switch (MODE) {
    case ENVIRONMENT_PRODUCT:
      return serverConfigProduct
      break;
    case ENVIRONMENT_DEVELOP:
    default:
      return serverConfigDevelop
      break;
  }
}

export default ServerConfig();