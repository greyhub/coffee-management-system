import { getManager, getRepository, In, Repository } from 'typeorm';
import { OrderProductEntity } from '../entity/orderProductEntity';
import IOrderProduct from '../model/IOrderProduct';
import logger from '../_base/log/logger4js';

// async function getMaxEmployeeId() {
//   try {
//     const repository = getRepository(EmployeeEntity);
//     const maxId = await repository
//     .createQueryBuilder("e")
//     .select("MAX(e.id)", "max")
//     .getRawOne()
//     if (!maxId || !maxId.hasOwnProperty("max") || !maxId.max) {
//       return null;
//     }
//     return maxId.max.toString();
//   }
//   catch(e) {
//     throw e;
//   }
// }

// async function deleteByIds(ids: Array<string>) {
//   try {
//     const repository = getRepository(EmployeeEntity);
//     // const deletedEmployees = await repository
//     // .createQueryBuilder()
//     // .update<EmployeeEntity>(EmployeeEntity, { isActive: false})
//     // .set({ isActive: false})
//     // .where("id = :id", { id: In(ids) })
//     // .returning(['id'])
//     // .updateEntity(true)
//     // .execute();
//     // logger.debug(JSON.stringify(deletedEmployees));
//     // return deletedEmployees.generatedMaps.map((id) => id.toString());
//     const employees = await repository.find({where: {id: In(ids), isActive: true}});
//     employees.map((e) => e.isActive = false);
//     const deletedIds = await repository.save(employees);
//     return deletedIds;
//   }
//   catch(e) {
//     throw e;
//   }
// }

// async function getById(id: string) {
//   try {
//     const repository = getRepository(EmployeeEntity);
//     const employees = await repository.find({id: id});
//     if (employees.length <= 0) {
//       return null;
//     }
//     else {
//       return employees[0];
//     }
//   }
//   catch(e) {
//     throw e;
//   }
// }
// async function getAll() {
//   try {
//     const repository = getRepository(EmployeeEntity);
//     return await repository.find({where: {isActive: true},cache: true});
//   }
//   catch(e) {
//     throw e;
//   }
// }
// function create (e: IOrderProduct){
//   try {
//     const repository = getRepository(OrderProductEntity);
//     return repository.create(e);
//   }
//   catch(e) {
//     throw e;
//   }
// }
async function save(orderProducts: any) {
  try {
    // await logger.debug("proIdDAO"+orderProducts.product.id);
    let repository = getRepository(OrderProductEntity);
    // let neworderProducts: any = await repository.create(orderProducts);
    // logger.debug("ĐÂUUDUAUDA"+JSON.stringify(orderProducts));
    let neworderProducts = await repository.save(orderProducts);
    // await logger.debug("proIdDAO"+JSON.stringify(neworderProducts));
    // console.log("hahaha"+re)
    return neworderProducts;
  }
  catch(e) {
    throw e;
  }
}
async function create(orderProducts: OrderProductEntity) {
  try {
    // await logger.debug("proIdDAO"+orderProducts.product.id);
    let repository = getRepository(OrderProductEntity);
    // let neworderProducts: any = await repository.create(orderProducts);
    // logger.debug("ĐÂUUDUAUDA"+JSON.stringify(orderProducts));
    let neworderProducts = repository.create(orderProducts);
    // await logger.debug("proIdDAO"+neworderProducts.product.id);
    // console.log("hahaha"+re)
    return neworderProducts;
  }
  catch(e) {
    throw e;
  }
}
async function getById(id: string) {
  try {
    // await logger.debug("proIdDAO"+orderProducts.product.id);
    const repository = getRepository(OrderProductEntity);
    // let neworderProducts: any = await repository.create(orderProducts);
    // logger.debug("ĐÂUUDUAUDA"+JSON.stringify(orderProducts));
    logger.debug(" id "+id);
    const neworderProducts = await repository.find({where: [{ order: id}]});
    logger.debug("orderProducts "+JSON.stringify(neworderProducts));
    // console.log("hahaha"+re)
    return neworderProducts;
  }
  catch(e) {
    throw e;
  }
}
// async function update(employee: any) {
//   try {
//     const repository = getRepository(EmployeeEntity);
//     return repository.update(employee.id, employee);
//   }
//   catch(e) {
//     throw e;
//   }
// }

const orderProductDAO = {
  // getMaxEmployeeId,
  getById,
  // getAll,
  create,
  save,
  // update,
  // deleteByIds
}

export default orderProductDAO;