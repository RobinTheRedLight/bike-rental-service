import { z } from 'zod';

const couponCreationValidationSchema = z.object({
  body: z.object({
    code: z.string(),
    discount: z.number().min(0).max(100),
    expiryDate: z.date(),
    description: z.string(),
  }),
  cookies: z.object({}),
});

export const AdminValidation = {
  couponCreationValidationSchema,
};
