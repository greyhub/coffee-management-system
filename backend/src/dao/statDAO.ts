import { Between, getRepository, In } from "typeorm";
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

const statDAO = {
  filterOrderByTime
}

export default statDAO;