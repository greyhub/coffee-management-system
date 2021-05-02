import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import EmployeeCreateDTO from "../dto/employee/employeeCreateDTO";
import EmployeesListFindDTO from "../dto/employee/employeesListFindDTO";
import employeeService from "../service/employeeService"
import sendResAppJson from "../dto/response/sendResAppJson";
import ValidatorEmployee from "../validator/validatorEmployee";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";
import EmployeesDeleteDTO from "../dto/employee/employeesDeleteDTO";

class EmployeeController extends AbstractController {
  private static _instance: EmployeeController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async getById(req: any, res: any, next: any) {
    try {
      if (!req.body.id) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.EMPLOYEE_INVALID_ID);
      }
      const employee = await employeeService.getById(req.body.id);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new EmployeeCreateDTO(employee));
    }
    catch(error) {
      next(error)
    }
  }

  public async getAll(req: any, res: any, next: any) {
    try {
      const employees = await employeeService.getAll();
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new EmployeesListFindDTO(employees));
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
      
      const ids = await employeeService.delete(req.body.ids);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new EmployeesDeleteDTO(ids));
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
      const errCode = ValidatorEmployee.isValidEmployeeWhenUpdate(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode <= Number(req.body.roleCode)) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      // Handle file
      let path;
      if (!req.file || !req.file.path) {
        path = null;
      }
      else {
        path = req.file.path;
      }

      const employee = await employeeService.updateInfo(req.body, path);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new EmployeeCreateDTO(employee));
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
      const errCode = ValidatorEmployee.isValidEmployee(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }

      // Handle role --> Author service --> hard code
      const roleCode = res.locals.roleCode;
      if (roleCode <= Number(req.body.roleCode)) {
        throw new CustomError(STATUS_CODE.FORBIDDEN, ERR_CODE.ACCOUNT_NO_PERMISSION);
      }

      // Handle file
      if (!req.file || !req.file.path) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.EMPLOYEE_UPLOAD_AVA_ERROR);
      }
      const path = req.file.path;

      const employee = await employeeService.createOne(req.body, path);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new EmployeeCreateDTO(employee));
    }
    catch(error) {
      next(error)
    }
  }
}

export default EmployeeController.Instance