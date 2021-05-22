import redis from 'redis'
import logger from './_base/log/logger4js';
const redisClient = redis.createClient(
  
);

redisClient.on("error", function(error) {
  logger.error("ERROR: CREATE REDIS CLIENT UNSUCESSFULLY\n" + JSON.stringify(error));
});

export default redisClient;