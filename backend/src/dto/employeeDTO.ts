import { EmployeeEntity } from "../entity/employeeEntity";
import AbstractDTO from "./abstractDTO";

export default class EmployeeDTO extends AbstractDTO{
  public id: string
  public firstName: string
  public lastName: string
  public cccd: string
  public avatarUri: string
  public isActive: boolean

  constructor(e: EmployeeEntity) {
    super();

    this.id = e.id;
    this.firstName = e.firstName;
    this.lastName = e.lastName;
    this.cccd = e.cccd;
    this.avatarUri = e.avatarUri
    this.isActive = e.isActive;
  }
}