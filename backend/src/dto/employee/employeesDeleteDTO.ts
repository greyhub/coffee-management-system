import ERR_CODE from "../../const/error";

export default class EmployeesDeleteDTO {
  error: ERR_CODE = ERR_CODE.OK
  message: ""

  private ids: string[]
  constructor(ids: string[]) {
    this.ids = ids;
  }
}