import { z } from 'zod';

// Define the schema using Zod
export const createBikeValidationSchema = z.object({
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
export const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    isAvailable: z.boolean().optional(),
    cc: z.number().optional(),
    year: z.number().int().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
  }),
  cookies: z.object({}),
});

export const BikeValidation = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
};
