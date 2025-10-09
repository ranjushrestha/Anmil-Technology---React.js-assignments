
const validate = (formData, validations = {}) => {
  const errors = {};

  Object.keys(validations).forEach((field) => {
    const rules = validations[field];
    const value = formData[field];

    if (!rules) return;

    //  Required field check
    if (rules.required && (value === "" || value === false || value == null)) {
      errors[field] = rules.message || "This field is required";
      return;
    }

    // Custom validate function
    if (rules.validate) {
      const result = rules.validate(value);
      if (!result.requirement) {
        errors[field] = result.message;
        return;
      }
    }

    // Field passed all checks 
    if (errors[field]) delete errors[field];
  });

  return errors;
};

export default validate;
