import ERR_CODE from "../../const/error";
import AbstractDTO from "../abstractDTO";

export default class GeneralSuccessResponse {
  error: ERR_CODE
  body: AbstractDTO

  constructor({
    error,
    body,
  }: {
    error: ERR_CODE,
    body: AbstractDTO
  }) {
    this.error = error;
    this.body = body;
  }
}