import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Coupon } from './admin.model';

// Service to delete a user
const deleteUserFromDB = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
};

// Service to promote a user to admin
const promoteUserToAdminInDB = async (userId: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { role: 'admin' },
    { new: true }
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

// Service to create a new coupon
const createCouponInDB = async (couponData: any) => {
  const newCoupon = await Coupon.create(couponData);
  return newCoupon;
};

export const AdminServices = {
  deleteUserFromDB,
  promoteUserToAdminInDB,
  createCouponInDB,
};
