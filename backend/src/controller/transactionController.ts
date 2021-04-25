import AbstractController from "./abstractController";

class TransactionController extends AbstractController {
  private static _instance: TransactionController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }
}

export default TransactionController.Instance