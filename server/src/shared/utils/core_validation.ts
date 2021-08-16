export function getCoreValidationConfig() {
  return {
    transformer: { excludeExtraneousValues: true },
    validator: { validationError: { target: false, value: false } },
  };
}
