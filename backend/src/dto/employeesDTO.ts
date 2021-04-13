import ERR_CODE from "../const/error";
import { EmployeeEntity } from "../entity/employeeEntity";
import AbstractDTO from "./abstractDTO";
import EmployeeDTO from "./employeeDTO";

export default class EmployeesDTO extends AbstractDTO {
  private employees: EmployeeDTO[]
  constructor(employees: EmployeeEntity[]) {
    super();

    this.employees = employees.map((e) => new EmployeeDTO(e));
  }
}