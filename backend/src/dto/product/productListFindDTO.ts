import ERR_CODE from "../../const/error";
import { ProductEntity } from "../../entity/productEntity";
import AbstractDTO from "../abstractDTO";
import ProductItemFindDTO from "./productItemFindDTO";

export default class ProductListFindDTO extends AbstractDTO{

  private products: ProductItemFindDTO[]
  constructor(products: ProductEntity[]) {
    super();
    this.products = products.map((e) => new ProductItemFindDTO(e));
  }
}