import {EmployeeEntity} from "../entity/employeeEntity"
import { OrderProductEntity } from "../entity/orderProductEntity";
export default interface IOrder {
  id: string
  updateAt: Date
  employee: EmployeeEntity
  note: string
  money: number
  tableCode: number
  orderProducts: OrderProductEntity[]
}