import { getManager, getRepository, In, Repository } from 'typeorm';
import { OrderEntity } from '../entity/orderEntity';
import { EmployeeEntity } from '../entity/employeeEntity';
import IOrder from '../model/IOrder';
import logger from '../_base/log/logger4js';

// async function getMaxOrderId() {
//   try {
//     const repository = getRepository(ProductEntity);
//     const maxId = await repository
//     .createQueryBuilder("e")
//     .select("MAX(e.id)", "max")
//     .getRawOne()
//     logger.debug(JSON.stringify(maxId));//{"max": null}
//     if (!maxId || !maxId.hasOwnProperty("max") || !maxId.max) {
//       return null;
//     }
//     return maxId.max.toString();
//   }
//   catch(e) {
//     throw e;
//   }
// }

// async function getById(id: string) {
//   try {
//     const repository = getRepository(ProductEntity);
//     const products = await repository.find({id: id});
//     if (products.length <= 0) {
//       return null;
//     }
//     else {
//       return products[0];
//     }
//   }
//   catch(e) {
//     throw e;
//   }
// }
// async function getAll() {
//   try {
//     const repository = getRepository(ProductEntity);
//     return await repository.find({cache: true});
//   }
//   catch(e) {
//     throw e;
//   }
// }
function create (e: IOrder){
  try {
    const repository = getRepository(OrderEntity);
    return repository.save(e);
  }
  catch(e) {
    throw e;
  }
}
async function save(order: OrderEntity) {
  try {
    const repository = getRepository(OrderEntity);
    return repository.save(order);
  }
  catch(e) {
    throw e;
  }
}
// async function update(product: any) {
//   try {
//     const repository = getRepository(ProductEntity);
//     return repository.update(product.id, product);
//   }
//   catch(e) {
//     throw e;
//   }
// }
// async function deleteByIds(ids: Array<string>) {
//   try {
//     const repository = getRepository(ProductEntity);
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
//     const products = await repository.find({where: {id: In(ids), isActive: true}});
//     products.map((e) => e.isActive = false);
//     const deletedIds = await repository.save(products);
//     return deletedIds;
//   }
//   catch(e) {
//     throw e;
//   }
// }


export default {
  // getMaxProductId,
  // getById,
  // getAll,
  create,
  save,
  // update,
  // deleteByIds
}