import ERR_CODE from "../../const/error";
import { OrderEntity } from "../../entity/orderEntity";
import AbstractDTO from "../abstractDTO";
import OrderItemFindDTO from "./orderItemFindDTO";

export default class OrderListFindDTO extends AbstractDTO{

  private orders: OrderItemFindDTO[]
  constructor(orders: OrderEntity[]) {
    super();
    this.orders = orders.map((e) => new OrderItemFindDTO(e));
  }
}