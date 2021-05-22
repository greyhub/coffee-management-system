import { getManager, getRepository, In, Repository } from 'typeorm';
import { EmployeeEntity } from '../entity/employeeEntity';
import IEmployee from '../model/IEmployee';
import logger from '../_base/log/logger4js';

async function getMaxEmployeeId() {
  try {
    const repository = getRepository(EmployeeEntity);
    const maxId = await repository
    .createQueryBuilder("e")
    .select("MAX(e.id)", "max")
    .getRawOne()
    if (!maxId || !maxId.hasOwnProperty("max") || !maxId.max) {
      return null;
    }
    return maxId.max.toString();
  }
  catch(e) {
    throw e;
  }
}

async function deleteByIds(ids: Array<string>) {
  try {
    const repository = getRepository(EmployeeEntity);
    // const deletedEmployees = await repository
    // .createQueryBuilder()
    // .update<EmployeeEntity>(EmployeeEntity, { isActive: false})
    // .set({ isActive: false})
    // .where("id = :id", { id: In(ids) })
    // .returning(['id'])
    // .updateEntity(true)
    // .execute();
    // logger.debug(JSON.stringify(deletedEmployees));
    // return deletedEmployees.generatedMaps.map((id) => id.toString());
    const employees = await repository.find({where: {id: In(ids), isActive: true}});
    employees.map((e) => e.isActive = false);
    const deletedIds = await repository.save(employees);
    return deletedIds;
  }
  catch(e) {
    throw e;
  }
}

async function getById(id: string) {
  try {
    const repository = getRepository(EmployeeEntity);
    const employees = await repository.find({id: id});
    if (employees.length <= 0) {
      return null;
    }
    else {
      return employees[0];
    }
  }
  catch(e) {
    throw e;
  }
}
async function getAll() {
  try {
    const repository = getRepository(EmployeeEntity);
    return await repository.find({cache: true});
  }
  catch(e) {
    throw e;
  }
}
function create (e: IEmployee){
  try {
    const repository = getRepository(EmployeeEntity);
    return repository.create(e);
  }
  catch(e) {
    throw e;
  }
}
async function save(employee: EmployeeEntity) {
  try {
    const repository = getRepository(EmployeeEntity);
    return repository.save(employee);
  }
  catch(e) {
    throw e;
  }
}
async function update(employee: any) {
  try {
    const repository = getRepository(EmployeeEntity);
    return repository.update(employee.id, employee);
  }
  catch(e) {
    throw e;
  }
}

const employeeDAO = {
  getMaxEmployeeId,
  getById,
  getAll,
  create,
  save,
  update,
  deleteByIds
}

export default employeeDAO;