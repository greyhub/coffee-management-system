import ERR_CODE from "../const/error"

export default abstract class AbstractDTO {
  error: ERR_CODE = ERR_CODE.OK
  message: ""
}