import { Model } from 'mongoose';

export interface TBike {
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable?: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
  img: string;
  rating?: number;
}

export interface BikeModel extends Model<TBike> {
  // Static method for checking bike availability by ID
  isBikeAvailableById(id: string): Promise<boolean>;
}
