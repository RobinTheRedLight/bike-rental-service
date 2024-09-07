import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/coupon', auth(USER_ROLE.admin), AdminControllers.createCoupon);

router.get('/coupon', AdminControllers.getAllCoupons);

router.delete(
  '/coupon/:id',
  auth(USER_ROLE.admin),
  AdminControllers.deleteCoupon,
);

export const AdminRoutes = router;
