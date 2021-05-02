import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import ProductCreateDTO from "../dto/product/productCreateDTO";
import ProductListFindDTO from "../dto/product/productListFindDTO";
import productService from "../service/productService"
import sendResAppJson from "../dto/response/sendResAppJson";
import ValidatorProduct from "../validator/validatorProduct";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";
import ProductDeleteDTO from "../dto/product/productDeleteDTO";


class ProductController extends AbstractController {
  private static _instance: ProductController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async getById(req: any, res: any, next: any) {
    try {
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PRODUCT_INVALID_ID);
      }
      const product = await productService.getById(req.body.id);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new ProductCreateDTO(product));
    }
    catch(error) {
      next(error)
    }
  }

  public async getAll(req: any, res: any, next: any) {
    try {
      const products = await productService.getAll();
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new ProductListFindDTO(products));
    }
    catch(error) {
      next(error)
    }
  }
  public async delete(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));
      
      const ids = await productService.delete(req.body.ids);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new ProductDeleteDTO(ids));
    }
    catch(error) {
      next(error)
    }
  }
  public async updateInfo(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = ValidatorProduct.isProduct(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode <= Number(req.body.roleCode)) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      // Handle file
      // let path;
      // if (!req.file || !req.file.path) {
      //   path = null;
      // }
      // else {
      //   path = req.file.path;
      // }

      const product = await productService.updateInfo(req.body);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new ProductCreateDTO(product));
    }
    catch(error) {
      next(error)
    }
  }
  public async createOne(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      const errCode = ValidatorProduct.isProduct(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode <= Number(req.body.roleCode)) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      const product = await productService.createOne(req.body);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new ProductCreateDTO(product));
    }
    catch(error) {
      next(error)
    }
  }
  public async updatePreview(req: any, res: any, next: any) {
    try {
      logger.info('INPUT:'
      +'\nbody:'+JSON.stringify(req.body)
      +'\nparams:'+JSON.stringify(req.params)
      +'\nquery:'+JSON.stringify(req.query));

      // Validate input
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PRODUCT_INVALID_ID);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode <= Number(req.body.roleCode)) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      // Handle file
      let path;
      if (!req.file || !req.file.path) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.PRODUCT_UPLOAD_PREVIEW_ERROR);
      }
      else {
        path = req.file.path;
      }

      const product = await productService.updatePreview(req.body.id, path);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new ProductCreateDTO(product));
    }
    catch(error) {
      next(error)
    }
  }

}

export default ProductController.Instance