// utils/validate.js
const validate = (formData, validations = {}) => {
  const errors = {};
  Object.keys(validations).forEach((field) => {
    const rules = validations[field];
    const value = formData[field];

    if (!rules) return;

    if (rules.required && (value === "" || value === false || value == null)) {
      errors[field] = rules.message || "This field is required";
      return;
    }

    if (rules.validate) {
      const result = rules.validate(value);
      if (!result.requirement) errors[field] = result.message;
    }
  });
  return errors;
};

export default validate;
