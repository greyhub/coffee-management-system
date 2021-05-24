import { TransactionEntity } from "../../entity/transactionEntity"
import AbstractDTO from "../abstractDTO"
import TransactionCreateDTO from "./transactionCreateDTO";
import TransactionItemFindDTO from "./transactionItemFindDTO";

export default class TransactionListFindDTO extends AbstractDTO{
  private transactions: TransactionItemFindDTO[]
  constructor(ts: TransactionEntity[]) {
    super();
    this.transactions = ts.map((t) => new TransactionItemFindDTO(t));
  }
}