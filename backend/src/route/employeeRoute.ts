import express, { Router } from 'express';
import cheatRoleMiddleware from '../cheat/cheatRoleMiddleware';
import accountController from '../controller/accountController';
import employeeController from '../controller/employeeController';
import authEmployeeMiddleware from '../middleware/authEmployeeMiddleware';

import uploadDisk from '../_base/file/uploadDisk';

const router: Router = express.Router();

router.post('/v1/employee/getbyid',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authEmployeeMiddleware("getById"),
  employeeController.getById
)

router.get('/v1/employee',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authEmployeeMiddleware("getAll"),
  employeeController.getAll
)

router.put('/v1/employee/createone',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authEmployeeMiddleware("create"),
  uploadDisk.single("avatar"),
  employeeController.createOne
)

router.delete('/v1/employee/delete',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authEmployeeMiddleware("delete"),
  employeeController.delete
)

router.put('/v1/employee/update',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authEmployeeMiddleware("update"),
  uploadDisk.single("avatar"),
  employeeController.updateInfo
)

/**
 * CHEAT
 */
router.all('/v1/cheat/employee/createone',
  cheatRoleMiddleware,
  uploadDisk.single("avatar"),
  employeeController.createOne
)
router.all('/v1/cheat/employee/update',
  cheatRoleMiddleware,
  uploadDisk.single("avatar"),
  employeeController.updateInfo
)

export default router;