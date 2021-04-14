import logger from "../log/logger4js";

class AuthorConfig {
  private _config: any = {}

  private static _instance: AuthorConfig
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public addConfig(config: any, resource: string) {
    if (this._config.hasOwnProperty(resource) && this._config[resource]) {
      logger.error(`ERROR: Author config has already added \`${resource}\` resource property`)
      return;
    }
    this._config[resource] = config;
  }
  public isAuthorized(resource: string, group: number, permission: string): boolean {
    let resCf, pmsCf;
    if (!this._config.hasOwnProperty(resource) || !this._config[resource]) {
      logger.error(`ERROR: Author config has not \`${resource}\` resource property`)
      return false
    }
    resCf = this._config[resource];
    if (!resCf.hasOwnProperty(permission) || !resCf[permission] || !Array.isArray(resCf[permission])) {
      logger.error(`ERROR: \`${resource}\` config has not \`${permission}\` permission property`)
      return false
    }
    pmsCf = resCf[permission];
    const groupAllow: any = pmsCf;
    return groupAllow.indexOf(group) !== -1
  }
}

export default AuthorConfig.Instance