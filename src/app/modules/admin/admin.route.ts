import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.delete(
  '/user/:id',
  auth(USER_ROLE.admin),
  AdminControllers.deleteUser,
);

router.put(
  '/user/:id/promote',
  auth(USER_ROLE.admin),
  AdminControllers.promoteUserToAdmin,
);

router.post(
  '/coupon',
  auth(USER_ROLE.admin),
  AdminControllers.createCoupon,
);

export const AdminRoutes = router;
