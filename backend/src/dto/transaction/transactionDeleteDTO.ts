import AbstractDTO from "../abstractDTO";

export default class TransactionDeleteDTO extends AbstractDTO {
  private ids: string[]
  constructor(ids: string[]) {
    super();
    this.ids = ids;
  }
}