import { Between, getManager, getRepository, In } from "typeorm";
import { OrderEntity } from "../entity/orderEntity";
import logger from "../_base/log/logger4js";

/**
 * 
 * @param start 
 * @param end 
 * @mean include start and end date
 */
async function filterOrderByTime(start: Date, end: Date) {
  try {
    const repository = getRepository(OrderEntity)
    return await repository
      .find({
        where: {
          updateAt: Between(start, end)
        },
        order: {
          updateAt: 'ASC'
        },
        cache: true
      });
  }
  catch(e) {
    throw e;
  }
}

async function filterProductRevenueByTime(start: Date, end: Date) {
  try {
    const entityManager = getManager();
    const res = await entityManager.query(
      "SELECT pd.id, op.count, filterOd.updateAt "
      + "from (select * "
        + "from order_entity as od "
        + "WHERE od.updateAt BETWEEN ? and ?) as filterOd, "
        + "order_product_entity as op, "
        + "product_entity as pd "
      + "where filterOd.id = op.orderId and op.productId = pd.id ", [start, end]);
    return res;
  }
  catch(e) {
    throw e;
  }
}

async function getRevenueCost(start:Date, end: Date) {
  try {
    const entityManager = getManager();
    const res = await entityManager.query(
      "SELECT *"
    + "from (select sum(filter.money) as revenue "
    + "from (SELECT od.money "
    + "FROM order_entity as od "
    + "where od.updateAt BETWEEN ? and ?) as filter) as total, "
    + "(select sum(filter.price) as cost "
    + "from (SELECT ts.price "
    + "from transaction_entity as ts "
    + "where ts.time BETWEEN ? and ?) as filter) as cost", [start, end, start, end]);
    return res;
  }
  catch(e) {
    throw e;
  }
}

const statDAO = {
  filterOrderByTime,
  filterProductRevenueByTime,
  getRevenueCost
}

export default statDAO;