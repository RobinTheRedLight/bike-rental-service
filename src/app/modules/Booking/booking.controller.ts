import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
  let token: any = req.headers.authorization;
  const splitToken = token.split(' ');
  token = splitToken[1];

  const result = await BookingServices.createBookingIntoDB({
    bookingData,
    token,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});
const createPayment = catchAsync(async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  const result = await BookingServices.createPaymentIntoStripe({
    amount,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment completed successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.updateBookingIntoDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike returned successfully',
    data: result,
  });
});

const updateBookingPay = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.updateBookingPayIntoDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Paid successfully',
    data: result,
  });
});

const getBooking = catchAsync(async (req, res) => {
  let token: any = req.headers.authorization;
  const splitToken = token.split(' ');
  token = splitToken[1];
  const result = await BookingServices.getBookingFromDB(token);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Rentals retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  updateBooking,
  getBooking,
  createPayment,
  updateBookingPay,
  getAllBookings,
};
