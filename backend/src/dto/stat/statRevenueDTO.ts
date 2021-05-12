import AbstractDTO from "../abstractDTO";

export default class StatRevenueDTO extends AbstractDTO {
  private type: string
  private revenue: number[]

  constructor(revenue: number[], type: string = "day") {
    super();

    this.type = type;
    this.revenue = revenue;
  }
}