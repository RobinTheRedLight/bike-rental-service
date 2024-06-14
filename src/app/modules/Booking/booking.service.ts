import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { User } from '../user/user.model';
import { Bike } from '../bike/bike.model';

const createBookingIntoDB = async (payload: any) => {
  const { bookingData, token } = payload;
  const { bikeId, startTime } = bookingData;

  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userEmail } = decoded;

  const user = await User.isUserExistsByEmail(userEmail);
  const { _id } = user as any;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const session = await Bike.startSession();
  session.startTransaction();

  try {
    const updateResult = await Bike.findByIdAndUpdate(
      bikeId,
      { isAvailable: false },
      { new: true, session },
    );

    if (!updateResult) {
      throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
    }

    // Create the booking
    const bookingCreation: TBooking = {
      userId: _id,
      bikeId: bikeId,
      startTime: startTime,
      returnTime: null,
      totalCost: 0,
      isReturned: false,
    };

    const result = await Booking.create(bookingCreation);
    const formattedResult = {
      _id: result._id,
      userId: result.userId,
      bikeId: result.bikeId,
      startTime: result.startTime,
      returnTime: result.returnTime,
      totalCost: result.totalCost,
      isReturned: result.isReturned,
    };

    await session.commitTransaction();
    session.endSession();

    return formattedResult;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const updateBookingIntoDB = async (id: string) => {
  try {
    const bookingData = await Booking.findById(id);
    if (!bookingData) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    const { startTime, bikeId } = bookingData;

    const updateBikeResult = await Bike.findByIdAndUpdate(
      bikeId,
      { isAvailable: true },
      { new: true },
    );
    if (!updateBikeResult) {
      throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
    }

    const bikeData = await Bike.findById(bikeId);
    if (!bikeData) {
      throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
    }

    const { pricePerHour } = bikeData;

    const startDate = new Date(startTime);
    const currentDate = new Date();
    const durationMs = currentDate.getTime() - startDate.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);
    const rentalHours = Math.ceil(durationHours);

    const totalCost = rentalHours * pricePerHour;

    const updatedData = {
      returnTime: currentDate,
      totalCost: totalCost,
      isReturned: true,
    };
    const updateBookingResult = await Booking.findByIdAndUpdate(
      id,
      updatedData,
      { new: true },
    );

    if (!updateBookingResult) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    const { _doc } = updateBookingResult as any;
    const { createdAt, updatedAt, __v, ...data } = _doc;

    return data;
  } catch (error) {
    throw error;
  }
};

const getBookingIntoDB = async (token: any) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userEmail } = decoded;

  const user = await User.isUserExistsByEmail(userEmail);
  const { _id: userId } = user as any;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  console.log(userEmail);

  const allBookingData = await Booking.find({ userId: userId });
  console.log(allBookingData);

  return allBookingData;
};

export const BookingServices = {
  createBookingIntoDB,
  updateBookingIntoDB,
  getBookingIntoDB,
};
