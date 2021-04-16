import { getManager, getRepository, Repository } from 'typeorm';
import { ProductEntity } from '../entity/productEntity';
import IProduct from '../model/IProduct';
import logger from '../_base/log/logger4js';

async function getMaxProductId() {
  try {
    const repository = getRepository(ProductEntity);
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
    const repository = getRepository(ProductEntity);
    return (await repository.find({id: id}))[0];
  }
  catch(e) {
    throw e;
  }
}
async function getAll() {
  try {
    const repository = getRepository(ProductEntity);
    return await repository.find({cache: true});
  }
  catch(e) {
    throw e;
  }
}
function create (e: IProduct){
  try {
    const repository = getRepository(ProductEntity);
    return repository.create(e);
  }
  catch(e) {
    throw e;
  }
}
async function save(product: ProductEntity) {
  try {
    const repository = getRepository(ProductEntity);
    return repository.save(product);
  }
  catch(e) {
    throw e;
  }
}

export default {
  getMaxProductId,
  getById,
  getAll,
  create,
  save,
}