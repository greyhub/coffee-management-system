import ERR_CODE from "../../const/error";
import { EmployeeEntity } from "../../entity/employeeEntity";
import AbstractDTO from "../abstractDTO";
import EmployeeItemFindDTO from "./employeeItemFindDTO";

export default class EmployeesListFindDTO extends AbstractDTO{
  private employees: EmployeeItemFindDTO[]
  constructor(employees: EmployeeEntity[]) {
    super();
    this.employees = employees.map((e) => new EmployeeItemFindDTO(e));
  }
}