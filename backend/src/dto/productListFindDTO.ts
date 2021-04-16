import ERR_CODE from "../const/error";
import { ProductEntity } from "../entity/productEntity";
import ProductCreateDTO from "./productCreateDTO";
import ProductItemFindDTO from "./productItemFindDTO";

export default class ProductListFindDTO {
  error: ERR_CODE = ERR_CODE.OK
  message: ""

  private products: ProductItemFindDTO[]
  constructor(products: ProductEntity[]) {
    this.products = products.map((e) => new ProductItemFindDTO(e));
  }
}