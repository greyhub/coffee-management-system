import { EmployeeEntity } from "../entity/employeeEntity";

export default interface ITransaction {
  id: string
  materialName: string
  description: string
  count: number
  price: number
  supplierName: string
  time: Date
  employee: EmployeeEntity
}