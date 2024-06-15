import { z } from 'zod';

const userUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
  cookies: z.object({}),
});

export const UserValidation = {
  userUpdateValidationSchema,
};
