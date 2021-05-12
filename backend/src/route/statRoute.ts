import express, { Router } from 'express';
import accountController from '../controller/accountController';
import statController from '../controller/statController';

const router: Router = express.Router();

router.post('/v1/stat/revenue',
  accountController.authTokenAndPassRoleCodeToResLocals,
  statController.viewRevenue
)

export default router;