declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveValidationError(expected: string): R;
    }
  }
}

export {};
