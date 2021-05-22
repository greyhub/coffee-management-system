import express, { Router } from 'express';
import accountController from '../controller/accountController';
import statController from '../controller/statController';

const router: Router = express.Router();

router.post('/v1/stat/revenue',
  accountController.authTokenAndPassRoleCodeToResLocals,
  statController.viewRevenue
)

router.post('/v1/stat/revenue/product',
  accountController.authTokenAndPassRoleCodeToResLocals,
  statController.viewRevenueProduct
)

router.post('/v1/stat/employee/order',
  accountController.authTokenAndPassRoleCodeToResLocals,
  statController.viewOrderEmployeeByTime
)

router.get('/v1/stat/revenue/cost',
  accountController.authTokenAndPassRoleCodeToResLocals,
  statController.viewRevenueCost
)

export default router;