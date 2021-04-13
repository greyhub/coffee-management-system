import express, { Router } from 'express';
import employeeController from '../controller/employeeController';

import uploadDisk from '../_base/file/uploadDisk';

const router: Router = express.Router();

router.get('/v1/employee', employeeController.getAll)
router.all('/v1/employee/createone', uploadDisk.single("avatar"), employeeController.createOne)

//employeeValidateMiddleware

export default router;