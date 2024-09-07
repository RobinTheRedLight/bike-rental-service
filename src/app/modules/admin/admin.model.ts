import { Schema, model } from 'mongoose';
import { TCoupon, CouponModel } from './admin.interface';

const couponSchema = new Schema<TCoupon, CouponModel>({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

couponSchema.statics.isCouponValid = async function (code: string) {
  const coupon = await this.findOne({ code });
  return coupon ? coupon.expiryDate > new Date() : false;
};

export const Coupon = model<TCoupon, CouponModel>('Coupon', couponSchema);
