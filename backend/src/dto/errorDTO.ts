import ERR_CODE from "../const/error"

export default class ErrorDTO {
  error: ERR_CODE = ERR_CODE.OK
  message: ""
  constructor() {
  }
}