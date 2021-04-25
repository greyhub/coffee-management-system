import {EmployeeEntity} from "../entity/employeeEntity"
export default interface IOrder {
  id: string
  updateAt: Date
  employee: EmployeeEntity
  note: string
  money: number
  tableCode: number
}