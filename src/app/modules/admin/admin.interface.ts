import { Model } from 'mongoose';

export interface TCoupon {
  code: string;
  discount: number;
  expiryDate: Date;
  description: string;
}

export interface CouponModel extends Model<TCoupon> {
  isCouponValid(code: string): Promise<boolean>;
}
