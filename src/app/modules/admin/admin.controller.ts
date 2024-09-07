import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';





const createCoupon = catchAsync(async (req, res) => {
  const couponData = req.body;
  const newCoupon = await AdminServices.createCouponInDB(couponData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Coupon created successfully',
    data: newCoupon,
  });
});

const getAllCoupons = catchAsync(async (req, res) => {
  const coupons = await AdminServices.getAllCouponsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All coupons retrieved successfully',
    data: coupons,
  });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const id = req.params.id;
  await AdminServices.deleteCouponFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon deleted successfully',
    data: null,
  });
});

export const AdminControllers = {
  createCoupon,
  getAllCoupons,
  deleteCoupon
};
