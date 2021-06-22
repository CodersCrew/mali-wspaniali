declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveValidationError(expected: string): R;
      toHaveValidationErrorSync(expected: string): R;
    }
  }
}

declare module 'date-faker';

export {};
