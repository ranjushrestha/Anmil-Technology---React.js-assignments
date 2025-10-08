import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import useForm from "../hooks/useForm"; 
import "../App.css";

function Subscribe() {
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

 
  const { formData, errors, handleChange, handleSubmit } = useForm({
    defaultValues: 
    { username: "", 
      email: "", 
      password: "", 
      gender: "", 
      terms: false },
      
    validations: {
      username: {
        required: true,
        validate: (val) => ({
           requirement: /^[a-zA-Z]{5,}$/.test(val), 
           message: "Username must be at least 5 characters" }),
      },
      email: {
        required: true,
        validate: (val) => ({ 
          requirement: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
           message: "Invalid email address" }),
      },
      password: {
        required: true,
        validate: (val) => ({ 
          requirement: /^.{8,}$/.test(val), 
          message: "Password must be at least 8 characters" }),
      },
      gender: {
        required: true,
        message: "Please select a gender",
      },
      terms: {
        required: true,
        message: "You must accept the terms",
      },
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className={`subscribe-container ${theme === "dark" ? "dark" : ""}`}>
      <div className="dark-mode-switch">
        <span>Dark Mode</span>
        <label className="switch">
          <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </div>

      <form className="subscribe-form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
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
