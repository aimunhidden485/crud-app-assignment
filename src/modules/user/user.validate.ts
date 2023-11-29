import { z } from 'zod';

const fullNameSchemaValidation = z.object({
  firstName: z.string().max(10, {
    message: 'Must be less than 10 characters',
  }),
  lastName: z.string().max(10, {
    message: 'Must be less than 10 characters',
  }),
});
const addressSchemaValidation = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const UserSchemaValidation = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().min(6, { message: 'Must be more than 5 characters' }),
  fullName: fullNameSchemaValidation,
  age: z.number(),
  address: addressSchemaValidation,
  email: z.string().email(),
  hobbies: z.array(z.string()),
  isActive: z.boolean(),
});

export default UserSchemaValidation;
