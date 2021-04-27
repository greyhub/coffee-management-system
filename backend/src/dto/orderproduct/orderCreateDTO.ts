
import { OrderEntity } from "../../entity/orderEntity";
import EmployeeItemFindDTO from "../employee/employeeItemFindDTO";
import AbstractDTO from "../abstractDTO";

export default class OrderCreateDTO extends AbstractDTO{
  
  public id: string
  public updateAt: Date
  public employee: EmployeeItemFindDTO
  public note: string
  public money: number
  public tableCode: number

  constructor(e: OrderEntity) {
    super();
    this.id = e.id;
    this.updateAt = e.updateAt;
    this.employee = new EmployeeItemFindDTO(e.employee);
    this.note = e.note;
    this.money = e.money
    this.tableCode = e.tableCode;
  }
}