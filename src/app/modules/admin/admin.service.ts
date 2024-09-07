import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Coupon } from './admin.model';


const createCouponInDB = async (couponData: any) => {
  const newCoupon = await Coupon.create(couponData);
  return newCoupon;
};

const getAllCouponsFromDB = async () => {
  const coupons = await Coupon.find();
  return coupons;
};

const deleteCouponFromDB = async (id: string) => {
  const coupon = await Coupon.findByIdAndDelete(id);
  if (!coupon) {
    throw new AppError(httpStatus.NOT_FOUND, 'Coupon not found');
  }
};

export const AdminServices = {
  createCouponInDB,
  getAllCouponsFromDB,
  deleteCouponFromDB,
};
