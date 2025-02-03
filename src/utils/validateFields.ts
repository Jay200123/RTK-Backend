interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates required fields in a request
 * @param fields - Object containing field names and their values
 * @returns ValidationResult indicating if all required fields are present
 * @example
 * const validation = validateRequiredFields({ email: 'user@example.com', password: '' });
 * if (!validation.isValid) {
 *   // Handle missing fields
 * }
 */

const validateRequiredFields = (
  fields: Record<string, any>,
  requiredFields: string[]
): ValidationResult => {
  const missingFields = requiredFields.filter((field) => {
    const value = fields[field];

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return !value?.toString().trim();
  });

  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    };
  }

  return { isValid: true };
};

export { validateRequiredFields };
