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
// const getBikesFromDB = async () => {
//   const result = await Bike.find();
//   const formattedResult = result.map((bike) => ({
//     _id: bike._id,
//     name: bike.name,
//     description: bike.description,
//     pricePerHour: bike.pricePerHour,
//     isAvailable: bike.isAvailable,
//     cc: bike.cc,
//     year: bike.year,
//     model: bike.model,
//     brand: bike.brand,
//   }));
//   return formattedResult;
// };

// const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
//   const result: any = await Bike.findByIdAndUpdate(id, payload, {
//     new: true,
//   });
//   const formattedResult = {
//     _id: result._id,
//     name: result.name,
//     description: result.description,
//     pricePerHour: result.pricePerHour,
//     isAvailable: result.isAvailable,
//     cc: result.cc,
//     year: result.year,
//     model: result.model,
//     brand: result.brand,
//   };

//   return formattedResult;
// };

// const deleteBikeFromDB = async (id: string) => {
//   const session = await Bike.startSession();
//   session.startTransaction();

//   try {
//     const updateResult = await Bike.findByIdAndUpdate(
//       id,
//       { isAvailable: false },
//       { new: true, session },
//     );

//     if (!updateResult) {
//       throw new Error('Bike not found');
//     }

//     const deleteResult = await Bike.findByIdAndDelete(id, { session });

//     if (!deleteResult) {
//       throw new Error('Bike not found or already deleted');
//     }

//     await session.commitTransaction();
//     session.endSession();

//     const formattedResult = {
//       _id: updateResult._id,
//       name: updateResult.name,
//       description: updateResult.description,
//       pricePerHour: updateResult.pricePerHour,
//       isAvailable: updateResult.isAvailable,
//       cc: updateResult.cc,
//       year: updateResult.year,
//       model: updateResult.model,
//       brand: updateResult.brand,
//     };

//     return formattedResult;
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     throw error;
//   }
// };

export const BookingServices = {
  createBookingIntoDB,
};
