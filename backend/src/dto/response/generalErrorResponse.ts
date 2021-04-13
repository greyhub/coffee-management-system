import ERR_CODE from "../../const/error";
import AbstractDTO from "../abstractDTO";

export default class GeneralErrorResponse {
  error: ERR_CODE
  message: string

  constructor({
    error,
    message,
  }: {
    error: ERR_CODE,
    message: string,
  }) {
    this.error = error;
    this.message = message;
  }
}