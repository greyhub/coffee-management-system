import { TransactionEntity } from "../../entity/transactionEntity"
import EmployeeItemFindDTO from "../employee/employeeItemFindDTO"

export default class TransactionItemFindDTO {
  public id: string
  public description: string
  public price: number
  public supplierName: string
  public time: Date
  public employee: EmployeeItemFindDTO

  constructor(t: TransactionEntity) {
    this.id = t.id;
    this.description = t.description;
    this.price = t.price;
    this.supplierName = t.supplierName;
    this.time = t.time;
    this.employee = new EmployeeItemFindDTO(t.employee);
  }
}