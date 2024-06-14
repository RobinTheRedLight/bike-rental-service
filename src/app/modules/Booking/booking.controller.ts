import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const token = req.headers.authorization;
  const result = await BookingServices.createBookingIntoDB({
    bookingData,
    token,
  });
  // const { _doc } = result as any;
  // const { createdAt, updatedAt, __v, ...data } = _doc;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
};
