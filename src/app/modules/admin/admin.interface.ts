import { Model } from 'mongoose';

export interface TCoupon {
  code: string;
  discount: number;
  expiryDate: Date;
}

export interface CouponModel extends Model<TCoupon> {
  isCouponValid(code: string): Promise<boolean>;
}
