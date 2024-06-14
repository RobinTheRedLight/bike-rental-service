import { z } from 'zod';

const userCreationValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
    phone: z.string().min(1, { message: 'Phone Number is required.' }),
    address: z.string().min(1, { message: 'Address is required.' }),
    role: z.enum(['admin', 'user'], {
      message: 'Role must be one of: admin, user.',
    }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema,
  userCreationValidationSchema,
};
