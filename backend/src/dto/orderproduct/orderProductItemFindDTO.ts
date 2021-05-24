import serverConfig from "../../config/serverConfig";
import { OrderProductEntity } from "../../entity/orderProductEntity";

import { ProductEntity } from "../../entity/productEntity";

// import productDAO from ".."

export default class OrderProductItemFindDTO{

  // public order: OrderItemFindDTO
  public product: ProductEntity
  public count: number

  constructor(e: OrderProductEntity) {
    // this.order = new OrderItemFindDTO(e.order);
    this.product = e.product;
    this.count = e.count;
  }
}