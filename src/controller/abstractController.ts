import serverConfig from "../config/serverConfig";

export default abstract class AbstractController {
  protected shouldAuth() {
    return serverConfig.shouldAuth;
  }
}