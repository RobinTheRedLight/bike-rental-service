import { z } from 'zod';

// Define the schema using Zod
export const bikeValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number(),
    isAvailable: z.boolean().optional(),
    cc: z.number(),
    year: z.number().int(),
    model: z.string(),
    brand: z.string(),
  }),
  cookies: z.object({}),
});

export const BikeValidation = {
  bikeValidationSchema,
};
