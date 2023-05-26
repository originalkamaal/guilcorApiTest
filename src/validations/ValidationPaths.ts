import { Schema } from 'yup';
import {
  CustomerSchemaCreate,
  CustomerSchemaGet,
} from './schema/CustomerSchema';

export const ValidationPaths: { [key: string]: Schema<object> } = {
  '/api/client/customer/create': CustomerSchemaCreate,
  '/api/client/customer/get': CustomerSchemaGet,
};
