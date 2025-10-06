import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { validationRules } from "../hooks/ValidationHooks";
import "../App.css";

function Subscribe() {
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    terms: false,
    gender: "",
    subscription: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate a single field
  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return null;

    // Check required
    if (rules.required) {
      const isEmpty =
        value === "" ||
        value === null ||
        (typeof value === "boolean" && !value);
      if (isEmpty) return rules.required;
    }

    // Check minLength
    if (rules.minLength && value.length < rules.minLength.value) {
      return rules.minLength.message;
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.value.test(value)) {
      return rules.pattern.message;
    }

    return null;
  };

  // Validate entire form
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = Object.keys(formData)
      .map((key) => ({ [key]: validateField(key, formData[key]) }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      console.log("Form submitted:", formData);
      setFormData({
        username: "",
        email: "",
        password: "",
        terms: false,
        gender: "",
        subscription: "",
      });
    }
  };

  return (
    <div className="subscribe-container">
      <div className="dark-mode-switch">
        <span>Dark Mode</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <form className="subscribe-form" onSubmit={handleSubmit}>
        <h2>Subscription Form</h2>

        {/* Username */}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "\u{1F441}" : "\u{1F441}\u{200D}\u{1F5E8}"}
            </button>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

       {/* Gender */}
<div className="form-group">
  <label>Gender:</label>
  <div className="radio-group">
    {["male", "female", "other"].map((g) => (
      <label key={g} className="radio-option">
        <input
          type="radio"
          name="gender"
          value={g}
          checked={formData.gender === g}
          onChange={handleChange}
        />
        {g}
      </label>
    ))}
  </div>
  {errors.gender && <p className="error">{errors.gender}</p>}
</div>


    

        {/* Terms */}
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <label>I agree to terms</label>
          {errors.terms && <p className="error">{errors.terms}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Subscribe;
