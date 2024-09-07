import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.body);
  const { _doc } = result as any;
  const { createdAt, updatedAt, __v, ...data } = _doc;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike added successfully',
    data: data,
  });
});

const getAllBike = catchAsync(async (req, res) => {
  const result = await BikeServices.getBikesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const bikeData = req.body;
  const result = await BikeServices.updateBikeIntoDB(id, bikeData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike updated successfully',
    data: result,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.deleteBikeFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike deleted successfully',
    data: result,
  });
});


export const BikeControllers = {
  createBike,
  getAllBike,
  updateBike,
  deleteBike
};
