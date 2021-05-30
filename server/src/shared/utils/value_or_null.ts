import { Transform } from 'class-transformer';

export function ValueOrNull(): PropertyDecorator {
  return Transform((value: unknown) => value ?? null);
}
