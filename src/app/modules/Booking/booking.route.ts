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
router.post('/create-payment-intent', BookingControllers.createPayment);

router.put(
  '/:id/return',
  auth(USER_ROLE.admin),
  BookingControllers.updateBooking,
);

router.put(
  '/pay/:id',
  auth(USER_ROLE.user),
  BookingControllers.updateBookingPay,
);

router.get('/', auth(USER_ROLE.user), BookingControllers.getBooking);

router.get('/all', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

export const BookingRoutes = router;
