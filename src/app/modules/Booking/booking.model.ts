import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      ref: 'Bike',
      required: [true, 'Bike id is required'],
    },
    startTime: {
      type: Date,
      required: true,
    },
    returnTime: {
      type: Date,
      default: null,
    },
    totalCost: {
      type: Number,
      required: true,
      default: 0,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

bookingSchema.pre('save', function (next) {
  const booking = this;

  next();
});

bookingSchema.post('save', function (doc, next) {
  next();
});

export const Booking = model<TBooking>('Booking', bookingSchema);
