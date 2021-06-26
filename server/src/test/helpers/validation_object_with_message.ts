import { ValidationError } from 'class-validator';

export function createValidationObject(
  field: string,
  message: { [value: string]: string },
): ValidationError {
  const error = new ValidationError();
  error.constraints = message;
  error.children = [];
  error.property = field;

  return error;
}
