class TransactionService {
  private static _instance: TransactionService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }
}

export default TransactionService.Instance