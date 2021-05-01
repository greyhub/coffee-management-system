import express, { Router } from 'express';
import accountController from '../controller/accountController';
import transactionController from '../controller/transactionController';
import authTransactionMiddleware from '../middleware/authTransactionMiddleware';

const router: Router = express.Router();

router.get('/v1/transaction/getbyid',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authTransactionMiddleware("getById"),
  transactionController.getById
)

router.get('/v1/transaction',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authTransactionMiddleware("getAll"),
  transactionController.getAll
)

router.put('/v1/transaction/createone',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authTransactionMiddleware("create"),
  transactionController.createOne
)

router.delete('/v1/transaction/delete',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authTransactionMiddleware("delete"),
  transactionController.delete
)

router.put('/v1/transaction/update',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authTransactionMiddleware("update"),
  transactionController.updateInfo
)

export default router;