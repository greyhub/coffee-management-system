import { getManager, getRepository, In, Repository } from 'typeorm';
import { OrderEntity } from '../entity/orderEntity';
import { EmployeeEntity } from '../entity/employeeEntity';
import IOrder from '../model/IOrder';
import logger from '../_base/log/logger4js';


async function getByImporterId(id: string) {
  try {
    const repository = getRepository(OrderEntity);
    // logger.info('INPUT2:' + id)
    const orders = await repository.find({employee: {id: id}});
    // logger.info('INPUT:'+ orders)
    if (orders.length <= 0) {
      return null;
    }
    else {
      return orders;
    }
  }
  catch(e) {
    throw e;
  }
}
async function getById(idx: string) {
  try {
    const repository = getRepository(OrderEntity);
    // logger.info('INPUT2:' + idx)
    // const orders = await repository
    //         .createQueryBuilder("order_entity")
    //         // .leftJoinAndSelect("order_entity.orderProducts", "order_product_entity")
    //         .where("order_entity.id = :id", { id: idx })
    //         // .where("order_product_entity.orderId = :orderId", { orderId: idx })
    //         .getMany();
    const order = await repository.findOne({id:idx})
    // logger.info('INPUT IDDDDDD:'+ JSON.stringify(order))
    // logger.info('INPUT ID:'+ orders[0].orderProducts[0].product)
    if (!order) {
      return null;
    }
    else {
      return order;
    }
    
  }
  catch(e) {
    throw e;
  }
}
async function getAll() {
  try {
    // logger.info('INPUT1:')
    const repository = getRepository(OrderEntity);
    // logger.info('INPUT2:')
    return await repository.find({cache: true});
  }
  catch(e) {
    throw e;
  }
}
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
async function update(order: OrderEntity) {
  try {
    const repository = getRepository(OrderEntity);
    // logger.debug("update"+ order.id)
    return repository.save(order);
  }
  catch(e) {
    throw e;
  }
}
async function deleteByIds(ids: Array<string>) {
  try {
    const repository = getRepository(OrderEntity);
    // logger.debug("Delete2")
    // await logger.debug("debug1"+JSON.stringify(ids))
    const deletedIds = await repository.createQueryBuilder()
                      .delete()
                      .from(OrderEntity)
                      .where("id IN (:idx)",{ idx:(ids)})
                      // .returning("id")
                      .execute();
    // await logger.debug("debug"+JSON.stringify(deletedIds))
    // const deletedIds = await repository.delete({id: In(ids)});
    return deletedIds;
  }
  catch(e) {
    throw e;
  }
}


export default {
  // getMaxProductId,
  getById,
  getByImporterId,
  getAll,
  create,
  save,
  update,
  deleteByIds,
}