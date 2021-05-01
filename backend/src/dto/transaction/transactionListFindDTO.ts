import { TransactionEntity } from "../../entity/transactionEntity"
import AbstractDTO from "../abstractDTO"
import TransactionCreateDTO from "./transactionCreateDTO";

export default class TransactionListFindDTO extends AbstractDTO{
  private transactions: TransactionCreateDTO[]
  constructor(ts: TransactionEntity[]) {
    super();
    this.transactions = ts.map((t) => new TransactionCreateDTO(t));
  }
}