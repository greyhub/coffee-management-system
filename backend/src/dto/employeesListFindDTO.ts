import ERR_CODE from "../const/error";
import { EmployeeEntity } from "../entity/employeeEntity";
import EmployeeCreateDTO from "./employeeCreateDTO";
import EmployeeItemFindDTO from "./employeeItemFindDTO";

export default class EmployeesListFindDTO {
  error: ERR_CODE = ERR_CODE.OK
  message: ""

  private employees: EmployeeItemFindDTO[]
  constructor(employees: EmployeeEntity[]) {
    this.employees = employees.map((e) => new EmployeeItemFindDTO(e));
  }
}