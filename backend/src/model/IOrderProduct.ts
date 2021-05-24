import { ProductEntity } from "../entity/productEntity";
import { OrderEntity } from "../entity/orderEntity";
export default interface IOrderProduct {
  order: OrderEntity[]
  product: ProductEntity[]
  count: number
}