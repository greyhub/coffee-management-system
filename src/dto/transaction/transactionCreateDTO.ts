import { TransactionEntity } from "../../entity/transactionEntity"
import AbstractDTO from "../abstractDTO"
import EmployeeItemFindDTO from "../employee/employeeItemFindDTO"

export default class TransactionCreateDTO extends AbstractDTO{
  public id: string
  public description: string
  public price: number
  public supplierName: string
  public time: Date
  public employee: EmployeeItemFindDTO

  constructor(t: TransactionEntity) {
    super();

    this.id = t.id;
    this.description = t.description;
    this.price = t.price;
    this.supplierName = t.supplierName;
    this.time = t.time;
    this.employee = new EmployeeItemFindDTO(t.employee);
  }
}