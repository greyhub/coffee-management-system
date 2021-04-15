import { getManager, getRepository, Repository } from 'typeorm';
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
    logger.debug(JSON.stringify(maxId));//{"max": null}
    if (!maxId || !maxId.hasOwnProperty("max") || !maxId.max) {
      return null;
    }
    return maxId.max.toString();
  }
  catch(e) {
    throw e;
  }
}

async function getById(id: string) {
  try {
    const repository = getRepository(EmployeeEntity);
    return (await repository.find({id: id}))[0];
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

export default {
  getMaxEmployeeId,
  getById,
  getAll,
  create,
  save,
}