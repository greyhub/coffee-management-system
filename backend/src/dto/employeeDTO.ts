import { EmployeeEntity } from "../entity/employeeEntity";
import AbstractDTO from "./abstractDTO";

export default class EmployeeDTO extends AbstractDTO{
  public id: string
  public name: string
  public cccd: string
  public avatarUri: string

  constructor(e: EmployeeEntity) {
    super();

    this.id = e.id;
    this.name = e.name;
    this.cccd = e.cccd;
    this.avatarUri = e.avatarUri
  }
}