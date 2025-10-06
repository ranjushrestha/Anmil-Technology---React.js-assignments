export const validationRules = {
  username: {
    required: "Username is required",
    minLength: { value: 3, message: "Username must be at least 3 characters" }
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email"
    }
  },
  password: {
    required: "Password is required",
    minLength: { value: 6, message: "Password must be at least 6 characters" }
  },
  gender: {
    required: "Please select a gender"
  },
 
  terms: {
    required: "You must accept terms"
  }
};
