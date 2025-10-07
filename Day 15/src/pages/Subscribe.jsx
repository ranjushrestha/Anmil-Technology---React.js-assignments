import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useValidation } from "../hooks/ValidationHooks";
import "../App.css";

const validationRules = {
  username: {
    required: "Username is required",
    pattern: {
      value: /^[a-zA-Z]{5,}$/,
      message: "Username must be at least 5 characters and contain only letters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    pattern: { value: /^.{8,}$/, message: "Password must be at least 8 characters" },
  },
  gender: { required: "Please select a gender" },
  terms: { required: "You must accept the terms" },
};

function Subscribe() {
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, errors, reset } = useValidation(
    { username: "", email: "", password: "", gender: "", terms: false },
    validationRules
  );

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    reset(); 
  };

  return (
    <div className="subscribe-container">
      <div className="dark-mode-switch">
        <span>Dark Mode</span>
        <label className="switch">
          <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </div>

      <form className="subscribe-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Subscription Form</h2>

        {/* Username */}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter username"
            {...register("username", validationRules.username)}
          />
          {errors.username && <p className="error">{errors.username.message}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input type="email" placeholder="Enter email" {...register("email", validationRules.email)} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", validationRules.password)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "hide" : "show"}
            </button>
          </div>
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            {["male", "female", "other"].map((g) => (
              <label key={g} className="radio-option">
                <input type="radio" value={g} {...register("gender", validationRules.gender)} />
                {g}
              </label>
            ))}
          </div>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>

        {/* Terms */}
        <div className="form-group checkbox-group">
          <input type="checkbox" {...register("terms", validationRules.terms)} />
          <label>I agree to terms</label>
          {errors.terms && <p className="error">{errors.terms.message}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Subscribe;
