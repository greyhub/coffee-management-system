import { getRepository, In } from "typeorm";
import { TransactionEntity } from "../entity/transactionEntity";
import ITransaction from "../model/ITransaction";
import logger from "../_base/log/logger4js";

async function getMaxTransactionId() {
  try {
    const repository = getRepository(TransactionEntity);
    const maxId = await repository
    .createQueryBuilder("t")
    .select("MAX(t.id)", "max")
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
async function getById(id: string) {
  try {
    const repository = getRepository(TransactionEntity);
    const ts = await repository.find({id: id});
    if (ts.length <= 0) {
      return null;
    }
    else {
      return ts[0];
    }
  }
  catch(e) {
    throw e;
  }
}
async function getAll() {
  try {
    const repository = getRepository(TransactionEntity);
    return await repository.find({cache: true});
  }
  catch(e) {
    throw e;
  }
}
function create(t: ITransaction) {
  try {
    const repository = getRepository(TransactionEntity);
    return repository.create(t);
  }
  catch(e) {
    throw e;
  }
}
async function save(t: TransactionEntity) {
  try {
    const repository = getRepository(TransactionEntity);
    return await repository.save(t);
  }
  catch(e) {
    throw e;
  }
}
async function saveMany(t: TransactionEntity[]) {
  try {
    const repository = getRepository(TransactionEntity);
    return await repository.save(t);
  }
  catch(e) {
    throw e;
  }
}
async function update(t: any) {
  try {
    const repository = getRepository(TransactionEntity);
    return await repository.update(t.id, t);
  }
  catch(e) {
    throw e;
  }
}
async function deleteByIds(ids: Array<string>) {
  try {
    const repository = getRepository(TransactionEntity);
    const ts = await repository.find({where: {id: In(ids)}});
    // logger.debug("JSON"+JSON.stringify(ts));
    return await repository.remove(ts);
  }
  catch(e) {
    throw e;
  }
}

const transactionDAO = {
  getMaxTransactionId,
  getById,
  getAll,
  create,
  save,
  saveMany,
  update,
  deleteByIds
}

export default transactionDAO;