import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

// Controller to delete a user
const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.id;
  await AdminServices.deleteUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: null,
  });
});

// Controller to promote a user to admin
const promoteUserToAdmin = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const updatedUser = await AdminServices.promoteUserToAdminInDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User promoted to admin successfully',
    data: updatedUser,
  });
});

// Controller to create a new coupon
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

export const AdminControllers = {
  deleteUser,
  promoteUserToAdmin,
  createCoupon,
};
