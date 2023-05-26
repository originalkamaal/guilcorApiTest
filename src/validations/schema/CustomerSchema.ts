import { number, object, string } from 'yup';

export const CustomerSchemaGet = object({
  uid: string().required(),
});

export const CustomerSchemaCreate = object({
  uid: string().required(),
  email: string().email().required(),
  displayName: string().required(),
  photoURL: string().nullable(),
  phoneNumber: number().nullable(),
});
