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

const deleteBikeFromDB = async (id: string) => {
  const session = await Bike.startSession();
  session.startTransaction();

  try {
    const updateResult = await Bike.findByIdAndUpdate(
      id,
      { isAvailable: false },
      { new: true, session },
    );

    if (!updateResult) {
      throw new Error('Bike not found');
    }

    const deleteResult = await Bike.findByIdAndDelete(id, { session });

    if (!deleteResult) {
      throw new Error('Bike not found or already deleted');
    }

    await session.commitTransaction();
    session.endSession();

    const formattedResult = {
      _id: updateResult._id,
      name: updateResult.name,
      description: updateResult.description,
      pricePerHour: updateResult.pricePerHour,
      isAvailable: updateResult.isAvailable,
      cc: updateResult.cc,
      year: updateResult.year,
      model: updateResult.model,
      brand: updateResult.brand,
    };

    return formattedResult;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const BikeServices = {
  createBikeIntoDB,
  getBikesFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
