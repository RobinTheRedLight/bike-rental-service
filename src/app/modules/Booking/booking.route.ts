import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { bookBikeValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(bookBikeValidation.bookBikeValidationSchema),
  BookingControllers.createBooking,
);

// router.get('/', BikeControllers.getAllBike);

// router.put(
//   '/:id',
//   auth(USER_ROLE.admin),
//   validateRequest(BikeValidation.updateBikeValidationSchema),
//   BikeControllers.updateBike,
// );

// router.delete('/:id', auth(USER_ROLE.admin), BikeControllers.deleteBike);

export const BookingRoutes = router;
