import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { BikeValidation } from './bike.validation';
import { BikeControllers } from './bike.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(BikeValidation.createBikeValidationSchema),
  BikeControllers.createBike,
);

router.get('/', BikeControllers.getAllBike);

router.put(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(BikeValidation.updateBikeValidationSchema),
  BikeControllers.updateBike,
);

router.delete('/:id', auth(USER_ROLE.admin), BikeControllers.deleteBike);

export const BikeRoutes = router;
