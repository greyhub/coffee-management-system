import AbstractDTO from "../abstractDTO";

export default class OrderDeleteDTO extends AbstractDTO {
  private numberDel: number
  constructor(nb: number) {
    super();
    this.numberDel = nb;
  }
}