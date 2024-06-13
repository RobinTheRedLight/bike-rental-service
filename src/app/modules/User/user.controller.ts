import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import { userValidationSchema } from './user.validation';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const zodParsedData = userValidationSchema.parse(userData);
  const result = await UserServices.createUserIntoDB(zodParsedData);
  const { _doc } = result as any;
  const { password, ...userWithoutPassword } = _doc;

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: userWithoutPassword,
  });
});

const getUser = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.getUserFromDB(token);
  const { _doc } = result as any;
  const { password, ...userWithoutPassword } = _doc;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: userWithoutPassword,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const updateData = req.body;
  const result = await UserServices.updateUserFromDB({ updateData, token });
  const { _doc } = result as any;
  const { password, createdAt, updatedAt, __v, ...userWithoutPassword } = _doc;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: userWithoutPassword,
  });
});

export const UserControllers = {
  createUser,
  getUser,
  updateUser,
};
