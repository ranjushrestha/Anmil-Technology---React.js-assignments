import { useState } from "react";
import Validate from "../utils/Validate";

const useForm = ({ defaultValues = {}, validations = {} } = {}) => {
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    if (!e || !e.target) return;

    const { name, type, value, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    const newData = { ...formData, [name]: val };
    setFormData(newData);

    // Validate field if form has been submitted at least once
    if (isSubmitted) {
      const fieldError = Validate({ [name]: val }, { [name]: validations[name] });
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors, ...fieldError };
        if (!fieldError[name]) delete updatedErrors[name]; // Clear error if field is valid
        return updatedErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = Validate(formData, validations);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      callback(formData); // Call callback if no errors
    }
  };

  return { formData, errors, handleChange, handleSubmit };
};

export default useForm;
