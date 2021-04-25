import serverConfigDevelop from "./develop/serverConfig.develop";
import serverConfigProduct from "./product/serverConfig.product";

const ENVIRONMENT_DEVELOP = 0;
const ENVIRONMENT_PRODUCT = 1;

let MODE = ENVIRONMENT_PRODUCT;

function ServerConfig() {
  switch (MODE) {
    case ENVIRONMENT_PRODUCT:
      return serverConfigProduct;
    case ENVIRONMENT_DEVELOP:
    default:
      return serverConfigDevelop;
  }
}

export default ServerConfig();