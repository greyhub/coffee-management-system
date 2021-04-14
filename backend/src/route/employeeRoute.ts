import express, { Router } from 'express';
import employeeAuthorConfig from '../config/develop/employeeAuthorConfig';
import employeeController from '../controller/employeeController';
import authFactoryMiddleware from '../middleware/authFactoryMiddleware';

import uploadDisk from '../_base/file/uploadDisk';

const router: Router = express.Router();

router.get('/v1/employee', authFactoryMiddleware(employeeAuthorConfig, "getAll"), employeeController.getAll)
router.all('/v1/employee/createone', uploadDisk.single("avatar"), employeeController.createOne)

//employeeValidateMiddleware

export default router;