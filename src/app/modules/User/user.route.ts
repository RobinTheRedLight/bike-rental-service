import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getUser,
);

router.get(
  '/allUsers',
  auth(USER_ROLE.admin),
  UserControllers.getAllUsers,
);

router.put(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.userUpdateValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
