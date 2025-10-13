export interface ValidationRule<T = any> {
  required?: boolean;
  message?: string;
  validate?: (value: T) => { requirement: boolean; message: string };
}

export type validation<T> = Partial<{ [K in keyof T]: ValidationRule<T[K]> }>;

const validate = <T extends Record<string, any>>(formData: T, validations: validation<T> = {}): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {};
  for (const field in validations) {
    const rules = validations[field];
    const value = formData[field];
    if (!rules) continue;
    let fieldError: string | undefined;
    if (rules.required && (value === "" || value === null || value === undefined || value === false)) fieldError = rules.message || "This field is required";
    if (!fieldError && rules.validate) {
      const result = rules.validate(value);
      if (!result.requirement) fieldError = result.message;
    }
    if (fieldError) errors[field] = fieldError;
  }
  return errors;
};

export default validate;
