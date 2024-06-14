import { z } from 'zod';

export const bookBikeValidationSchema = z.object({
  body: z.object({
    bikeId: z.string(),
    startTime: z.string(),
  }),
  cookies: z.object({}),
});

export const bookBikeValidation = {
  bookBikeValidationSchema,
};
