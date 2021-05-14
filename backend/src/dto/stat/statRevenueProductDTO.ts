import { ProductEntity } from "../../entity/productEntity";
import AbstractDTO from "../abstractDTO";

export default class StatRevenueProductDTO extends AbstractDTO {
  private type: string
  private revenue: Object //Map id -> {counts: number[], price: number}

  constructor(revenue: Map<string, {counts: Array<number>, metadata: ProductEntity}>, type: string = "day") {
    super();

    this.type = type;
    this.revenue = Object.fromEntries(revenue);
  }
}