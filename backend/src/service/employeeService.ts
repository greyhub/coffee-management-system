import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from '../const/status';
import employeeDAO from '../dao/employeeDAO'
import CustomError from '../error/customError';
import logger from "../_base/log/logger4js";
import dateUtil from "../util/dateUtil";
import accountService from "./accountService";

class EmployeeService {
  private static _instance: EmployeeService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  private async generateEmployeeId() {
    let maxId = await employeeDAO.getMaxEmployeeId();
    if (!maxId) {
      maxId = "CF-000000";
    }
    const arr = maxId.split("-");
    let nextId = (parseInt(arr[1], 10) + 1).toString().padStart(6, "0");
    return arr[0] + "-" + nextId.toString();
  }

  public async getById(id: string) {
    try {
      const employee = await employeeDAO.getById(id);
      if (!employee) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.EMPLOYEE_GET_BY_ID_ERROR);
      }
      return employee;
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.EMPLOYEE_GET_BY_ID_ERROR);
    }
  }
  public async getAll() {
    const employees = await employeeDAO.getAll();
    return employees;
  }
  public async delete(ids: Array<string>) {
    try {
      const employees = await employeeDAO.deleteByIds(ids);
      const deletedIds = employees.map((e) => e.id);
      // const deletedIds = employees;
      logger.debug("Delete" + deletedIds)
      return deletedIds;
    }
    catch {
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.EMPLOYEE_DELETE_ERROR);
    }
  }
  public async updateInfo(employee: any, avatarPath: string) {
    try {
      // Gen Date
      employee.birthday = dateUtil.fromString(employee.birthday)
      employee.joinDate = dateUtil.fromString(employee.joinDate)
      employee.expireDate = dateUtil.fromString(employee.expireDate)

      const e = await employeeDAO.getById(employee.id);
      if (e) {
        let newEmployee: any = {
          id: e.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          avatarUri: avatarPath ? avatarPath : e.avatarUri,
          isActive: employee.isActive === false ? false : true,
          account: employee.account,
          address: employee.address,
          hashPassword: e.hashPassword,
          birthday: employee.birthday,
          expireDate: employee.expireDate,
          joinDate: employee.joinDate,
          position: employee.position,
          roleCode: employee.roleCode,
          salary: employee.salary
        };
        if (employee.cccd !== e.cccd) {
          newEmployee.cccd = employee.cccd;
        }
        if (employee.account !== e.account) {
          newEmployee.account = employee.account;
        }
        await employeeDAO.update(newEmployee);
        let newEntity = await this.getById(e.id);
        newEntity.password = e.password;
        return newEntity;
      }
      else {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.EMPLOYEE_UPDATE_ERROR);
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
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.EMPLOYEE_CREATE_ERROR);
    }
  }
  public async createOne(e: any, avatarPath: string) {
    try {
      // Generate Next Ids
      const nextId = await this.generateEmployeeId();
      logger.debug("GENERATE" + nextId);

      // Hash Password
      e.hashPassword = await accountService.hashPassword(e.password);

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
        roleCode: e.roleCode,
        salary: e.salary
      });
      newEmployee.password = e.password;

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