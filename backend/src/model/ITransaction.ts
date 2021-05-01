import { EmployeeEntity } from "../entity/employeeEntity";

export default interface ITransaction {
  id: string
  description: string
  price: number
  supplierName: string
  time: Date
  employee: EmployeeEntity
}