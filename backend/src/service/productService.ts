import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from '../const/status';
import productDAO from '../dao/productDAO'
import CustomError from '../error/customError';
import logger from "../_base/log/logger4js";
import dateUtil from "../util/dateUtil";

class ProductService {
  private static _instance: ProductService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  private async generateProductId() {
    let maxId = await productDAO.getMaxProductId();
    if (!maxId) {
      maxId = "PD-000000";
    }
    const arr = maxId.split("-");
    let nextId = (parseInt(arr[1], 10) + 1).toString().padStart(6, "0");
    return arr[0] + "-" + nextId.toString();
  }
  
  public async getById(id: string) {
    try {
      const product = await productDAO.getById(id);
      if (!product) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PRODUCT_GET_BY_ID_ERROR);
      }
      return product;
    }
    catch(e) {
      if (e instanceof QueryFailedError) {
        logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PRODUCT_GET_BY_ID_ERROR);
    }
  }
  public async getAll() {
    const products = await productDAO.getAll();
    return products;
  }
  public async createOne(e: any) {
    try {
      // Generate Next Id
      const nextId = await this.generateProductId();
      // logger.debug("GENERATE" + nextId);

      // Create Product to save
      let newProduct = productDAO.create({
        id: nextId,
        name: e.name,
        price: e.price,
        description: e.description,
        previewUri: "./static/default-avatar.png",
        isActive: e.isActive === false ? false : true,
      });

      // Save product in database
      newProduct = await productDAO.save(newProduct);
      return newProduct;
    }
    catch(e) {
      if (e instanceof QueryFailedError) {
        logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PRODUCT_CREATE_ERROR);
    }
  }
  public async updateInfo(product: any) {
    try {

      const e = await productDAO.getById(product.id);
      if (e) {
        let newProduct: any = {
          id: e.id,
          name: product.name,
          price: product.price,
          description: product.description,
          previewUri: e.previewUri,
          isActive: product.isActive === false ? false : true, 
        };
        await productDAO.update(newProduct);
        return newProduct;
      }
      else {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PRODUCT_UPDATE_ERROR);
      }
    }
    catch(e) {
      if (e instanceof QueryFailedError) {
        logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PRODUCT_UPDATE_ERROR);
    }
  }
  public async delete(ids: Array<string>) {
    try {
      const productss = await productDAO.deleteByIds(ids);
      const deletedIds = productss.map((e) => e.id);
      // const deletedIds = productss;
      // logger.debug("Delete" + deletedIds)
      return deletedIds;
    }
    catch {
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PRODUCT_DELETE_ERROR);
    }
  }
  public async updatePreview(id: string, previewPath: string) {
    try {

      const e = await productDAO.getById(id);
      if (e) {
        let newProduct: any = {
          id: e.id,
          name: e.name,
          price: e.price,
          description: e.description,
          previewUri: previewPath ? previewPath : e.previewUri,
          isActive: e.isActive, 
        };
        await productDAO.update(newProduct);
        return newProduct;
      }
      else {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PRODUCT_UPLOAD_PREVIEW_ERROR);
      }
    }
    catch(e) {
      if (e instanceof QueryFailedError) {
        logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PRODUCT_UPLOAD_PREVIEW_ERROR);
    }
  }

}

export default ProductService.Instance