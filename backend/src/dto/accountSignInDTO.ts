import serverConfig from "../config/serverConfig";
import ERR_CODE from "../const/error";
import { EmployeeEntity } from "../entity/employeeEntity";

export default class AccountSignInDTO {
  error: ERR_CODE = ERR_CODE.OK
  message: ""
  
  public token: string
  
  public id: string
  public firstName: string
  public lastName: string
  public birthday: Date
  public address: string
  public position: string
  public joinDate: Date
  public expireDate: Date
  public cccd: string
  public avatarUri: string
  
  constructor(token: string, e: EmployeeEntity) {
    this.token = token;

    this.id = e.id;
    this.firstName = e.firstName;
    this.lastName = e.lastName;
    this.birthday = e.birthday;
    this.address = e.address;
    this.position = e.position;
    this.joinDate = e.joinDate;
    this.expireDate = e.expireDate;
    this.cccd = e.cccd;
    this.avatarUri = serverConfig?.urlPrefix + e.avatarUri
  }
}