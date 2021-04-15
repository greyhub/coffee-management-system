import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import EmployeeDTO from "../dto/employeeDTO";
import EmployeesDTO from "../dto/employeesDTO";
import employeeService from "../service/employeeService"
import sendResAppJson from "../dto/response/sendResAppJson";
import ValidatorEmployee from "../validator/validatorEmployee";
import CustomError from "../error/customError";

class EmployeeController {
  private static _instance: EmployeeController
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async getAll(req: any, res: any, next: any) {
    try {
      const employees = await employeeService.getAll();
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new EmployeesDTO(employees));
    }
    catch(error) {
      next(error)
    }
  }
  public async createOne(req: any, res: any, next: any) {
    try {
      // Validate input
      console.log(JSON.stringify(req.body));
      const errCode = ValidatorEmployee.isValidEmployee(req.body);
      if (errCode !== ERR_CODE.OK) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, errCode);
      }
      console.log("createone");
      const path = req.file.path;
      const employee = await employeeService.createOne(req.body, path);
      sendResAppJson(res, STATUS_CODE.OK, ERR_CODE.OK, new EmployeeDTO(employee));
    }
    catch(error) {
      next(error)
    }
  }
}

export default EmployeeController.Instance