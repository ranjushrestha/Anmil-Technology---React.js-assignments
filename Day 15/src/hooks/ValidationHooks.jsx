// src/utils/validation.js

export const validationHooks= (values) => {
  const errors = {};

  // Username
  if (!values.username || !values.username.trim()) {
    errors.username = "Username is required";
  } else if (values.username.length < 5) {
    errors.username = "Username must be at least 5 characters";
  }

  // Email
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // Password
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  // Gender
  if (!values.gender) {
    errors.gender = "Please select a gender";
  }

  // Terms checkbox
  if (!values.terms) {
    errors.terms = "You must accept the terms";
  }

  return errors;
};
