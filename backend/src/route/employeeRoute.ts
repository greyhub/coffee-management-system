import express, { Router } from 'express';
import accountController from '../controller/accountController';
import employeeController from '../controller/employeeController';
import authEmployeeMiddleware from '../middleware/authEmployeeMiddleware';

import uploadDisk from '../_base/file/uploadDisk';

const router: Router = express.Router();

router.get('/v1/employee',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authEmployeeMiddleware("getAll"),
  employeeController.getAll
)

router.all('/v1/employee/createone',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authEmployeeMiddleware("create"),
  uploadDisk.single("avatar"),
  employeeController.createOne
)

export default router;