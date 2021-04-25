import serverConfig from "../../config/serverConfig";
import ERR_CODE from "../../const/error";
import { OrderEntity } from "../../entity/orderEntity";
import { EmployeeEntity } from "../../entity/employeeEntity";
import AbstractDTO from "../abstractDTO";

export default class OrderCreateDTO extends AbstractDTO{
  
  public id: string
  public updateAt: Date
  public employee: EmployeeEntity
  public note: string
  public money: number
  public tableCode: number

  constructor(e: OrderEntity) {
    super();
    this.id = e.id;
    this.updateAt = e.updateAt;
    this.employee = e.employee;
    this.note = e.note;
    this.money = e.money
    this.tableCode = e.tableCode;
  }
}