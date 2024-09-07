import { Types } from 'mongoose';

export interface TBooking {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date | null;
  totalCost: number;
  isReturned: boolean;
  isPaid: boolean;
}
