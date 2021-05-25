import serverConfig from "../../config/serverConfig";
import { EmployeeEntity } from "../../entity/employeeEntity";
import AbstractDTO from "../abstractDTO";

export default class EmployeeCreateDTO extends AbstractDTO{
  public id: string
  public firstName: string
  public lastName: string
  public birthday: Date
  public address: string
  public position: string
  public joinDate: Date
  public expireDate: Date
  public roleCode: number
  public cccd: string
  public avatarUri: string
  public isActive: boolean
  public account: string
  public salary: number

  constructor(e: EmployeeEntity) {
    super();

    this.id = e.id;
    this.firstName = e.firstName;
    this.lastName = e.lastName;
    this.birthday = e.birthday;
    this.address = e.address;
    this.position = e.position;
    this.joinDate = e.joinDate;
    this.expireDate = e.expireDate;
    this.roleCode = e.roleCode;
    this.cccd = e.cccd;
    this.avatarUri = serverConfig?.urlPrefix + e.avatarUri
    this.isActive = e.isActive;
    this.salary = e.salary;
    this.account = e.account;
  }
}