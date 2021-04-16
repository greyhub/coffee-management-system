import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from '../const/status';
import productDAO from '../dao/productDAO'
import CustomError from '../error/customError';
import logger from "../_base/log/logger4js";
import bcrypt from "bcrypt";
import moment from "moment";
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
  private async hashPassword(password: string) {
    await bcrypt.hash(password, 10, function(err, hash) {
      if (err) {
        return ""
      }
      else {
        return hash;
      }
    })
  }
  private async compareToken(token: string) {
    return true;
  }

  public async getById(id: string) {
    const employee = await employeeDAO.getById(id);
    return employee;
  }
  public async getAll() {
    const employees = await employeeDAO.getAll();
    return employees;
  }
  public async createOne(e: any, avatarPath: string) {
    try {
      // Generate Next Id
      const nextId = await this.generateEmployeeId();
      logger.debug("GENERATE" + nextId);

      // Hash Password
      e.hashPassword = await this.hashPassword(e.hashPassword);
      if (e.hashPassword === "") {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.EMPLOYEE_INVALID_PASSWORD);
      }

      logger.debug("joindate" + new Date(e.joinDate))

      // Gen Date
      e.birthday = dateUtil.fromString(e.birthday)
      e.joinDate = dateUtil.fromString(e.joinDate)
      e.expireDate = dateUtil.fromString(e.expireDate)

      // Create Employee to save
      let newEmployee = employeeDAO.create({
        id: nextId,
        firstName: e.firstName,
        lastName: e.lastName,
        cccd: e.cccd,
        avatarUri: avatarPath,
        isActive: e.isActive === false ? false : true,
        account: e.account,
        address: e.address,
        hashPassword: e.hashPassword,
        birthday: e.birthday,
        expireDate: e.expireDate,
        joinDate: e.joinDate,
        position: e.position,
        roleCode: e.roleCode
      });

      // Save employee in database
      newEmployee = await employeeDAO.save(newEmployee);
      return newEmployee;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.EMPLOYEE_CREATE_ERROR);
    }
  }
}

export default EmployeeService.Instance