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

const getBooking = catchAsync(async (req, res) => {
  let token: any = req.headers.authorization;
  const splitToken = token.split(' ');
  token = splitToken[1];
  const result = await BookingServices.getBookingIntoDB(token);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  updateBooking,
  getBooking,
};
