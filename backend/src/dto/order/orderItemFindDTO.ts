
import { EmployeeEntity } from "../../entity/employeeEntity";
import { OrderProductEntity } from "../../entity/orderProductEntity";
import { OrderEntity } from "../../entity/orderEntity";


export default class OrderItemFindDTO{

  public id: string
  public updateAt: Date
  public employee: EmployeeEntity
  public note: string
  public money: number
  public tableCode: number
  public orderProduct: OrderProductEntity[]

  constructor(e: OrderEntity) {
    this.id = e.id;
    this.updateAt = e.updateAt;
    this.employee = e.employee;
    this.note = e.note;
    this.money = e.money
    this.tableCode = e.tableCode;
    this.orderProduct = e.orderProducts;
  }
}