/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  //create a user
  const newUser = await User.create(payload);
  return newUser;
};

const getAllUsersFromDB = async () => {
  const users = await User.find().select('-password');
  return users;
};

const getUserFromDB = async (payload: any) => {
  const token = payload;
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userEmail } = decoded;

  const user = await User.isUserExistsByEmail(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  return user;
};

const updateUserFromDB = async (payload: any) => {
  const { token, updateData } = payload;
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userEmail } = decoded;

  const user = await User.isUserExistsByEmail(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await User.findOneAndUpdate({ email: userEmail }, updateData, {
    new: true,
  });
  return result;
};

const updateUserAdminFromDB = async (payload: any) => {
  const { id, updateData } = payload;

  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await User.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const deleteResult = await User.findByIdAndDelete(id);

  if (!deleteResult) {
    throw new Error('User not found or already deleted');
  }

  return deleteResult;
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  updateUserFromDB,
  getAllUsersFromDB,
  deleteUserFromDB,
  updateUserAdminFromDB,
};
