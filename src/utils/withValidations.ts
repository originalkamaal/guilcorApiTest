/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationPaths } from '@/validations/ValidationPaths';
import { ValidationError } from 'yup';

const withValidations = async (path: string, body: object) => {
  try {
    const validatedBody: any = await ValidationPaths[path]?.validate(body, {
      stripUnknown: true,
    });
    return validatedBody;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error.message;
    }
    throw error;
  }
};

export default withValidations;
