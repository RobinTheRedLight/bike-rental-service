import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { userValidationSchema } from './user.validation';

const router = express.Router();

router.get('/me', UserControllers.getUser);
router.put('/me', UserControllers.updateUser);

export const UserRoutes = router;
