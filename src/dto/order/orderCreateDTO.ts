
import { OrderEntity } from "../../entity/orderEntity";
import EmployeeItemFindDTO from "../employee/employeeItemFindDTO";
import OrderProductItemFindDTO from "../orderproduct/orderProductItemFindDTO";
import AbstractDTO from "../abstractDTO";

export default class OrderCreateDTO extends AbstractDTO{
  
  public id: string
  public updateAt: Date
  public employee: EmployeeItemFindDTO
  public note: string
  public money: number
  public tableCode: number
  public orderProducts: OrderProductItemFindDTO[]

  constructor(e: OrderEntity) {
    super();
    this.id = e.id;
    this.updateAt = e.updateAt;
    this.employee = new EmployeeItemFindDTO(e.employee);
    this.note = e.note;
    this.money = e.money
    this.tableCode = e.tableCode;
    this.orderProducts = e.orderProducts.map((e: any ) => new OrderProductItemFindDTO(e))
  }
}