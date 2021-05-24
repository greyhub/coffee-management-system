import AbstractDTO from "../abstractDTO";
import EmployeeItemFindDTO from "../employee/employeeItemFindDTO";

export default class statOrderEmployeeDTO extends AbstractDTO {
  private type: string
  private revenue: Object //Map id -> {counts: number[], price: number}

  constructor(revenue: Map<string, {counts: Array<number>, money: Array<number>, metadata: EmployeeItemFindDTO}>, type: string = "day") {
    super();

    this.type = type;
    this.revenue = Object.fromEntries(revenue);
  }
}