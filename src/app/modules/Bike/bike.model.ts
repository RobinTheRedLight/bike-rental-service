import { Schema, model } from 'mongoose';
import { TBike, BikeModel } from './bike.interface';

const bikeSchema = new Schema<TBike, BikeModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    cc: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Static method for checking bike availability by ID
bikeSchema.statics.isBikeAvailableById = async function (
  id: string,
): Promise<boolean> {
  const bike = await this.findById(id);
  return !!bike?.isAvailable;
};

export const Bike = model<TBike, BikeModel>('Bike', bikeSchema);
