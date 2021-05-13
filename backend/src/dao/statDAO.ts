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
          }
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

const statDAO = {
  filterOrderByTime,
  filterProductRevenueByTime
}

export default statDAO;