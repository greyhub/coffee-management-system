import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import EmployeeCreateDTO from "../dto/employeeCreateDTO";
import EmployeesListFindDTO from "../dto/employeesListFindDTO";
import employeeService from "../service/employeeService"
import sendResAppJson from "../dto/response/sendResAppJson";
import ValidatorEmployee from "../validator/validatorEmployee";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import AbstractController from "./abstractController";

class EmployeeController extends AbstractController {
  private static _instance: EmployeeController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
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