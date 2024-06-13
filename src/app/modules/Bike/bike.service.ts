import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};
const getBikesFromDB = async () => {
  const result = await Bike.find();
  const formattedResult = result.map((bike) => ({
    _id: bike._id,
    name: bike.name,
    description: bike.description,
    pricePerHour: bike.pricePerHour,
    isAvailable: bike.isAvailable,
    cc: bike.cc,
    year: bike.year,
    model: bike.model,
    brand: bike.brand,
  }));
  return formattedResult;
};

const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  const result: any = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
  });
  const formattedResult = {
    _id: result._id,
    name: result.name,
    description: result.description,
    pricePerHour: result.pricePerHour,
    isAvailable: result.isAvailable,
    cc: result.cc,
    year: result.year,
    model: result.model,
    brand: result.brand,
  };

  return formattedResult;
};

export const BikeServices = {
  createBikeIntoDB,
  getBikesFromDB,
  updateBikeIntoDB,
};
