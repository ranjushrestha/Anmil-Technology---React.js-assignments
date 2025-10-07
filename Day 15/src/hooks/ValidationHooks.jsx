

export const validationHooks = (values) => {
  const errors = {};

 
  const rules = {
    username: {
      required: "Username is required",
      pattern: /^[a-zA-Z]{5,}$/,
      patternMessage: "Username must be at least 5 characters and contain only letters",
    },
    email: {
      required: "Email is required",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      patternMessage: "Invalid email address",
    },
    password: {
      required: "Password is required",
      pattern: /^.{8,}$/, 
      patternMessage: "Password must be at least 8 characters",
    },
    gender: { required: "Please select a gender" },
    terms: { required: "You must accept the terms" },
  };

  // Validate fields
  Object.keys(rules).forEach((field) => {
    const value = values[field];

    // Required check
    if (!value || (typeof value === "string" && !value.trim())) {
      errors[field] = rules[field].required;
      return;
    }

    // Regex check
    if (rules[field].pattern && !rules[field].pattern.test(value)) {
      errors[field] = rules[field].patternMessage;
    }
  });

  return errors;
};
