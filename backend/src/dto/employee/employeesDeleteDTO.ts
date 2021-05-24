import AbstractDTO from "../abstractDTO";

export default class EmployeesDeleteDTO extends AbstractDTO {
  private ids: string[]
  constructor(ids: string[]) {
    super();
    this.ids = ids;
  }
}