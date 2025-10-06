import { useState } from "react";
import { useTheme } from "../context/ThemeContext"; 
import "../App.css";

function Subscribe() {
  const { theme, toggleTheme } = useTheme();  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    if (!formData.password.trim()) newErrors.password = "Password required";
    if (!formData.terms) newErrors.terms = "You must accept terms";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setFormData({ username: "", email: "", password: "", terms: false });
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
        <h2>Subscribtion Form</h2>

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

        <button type="submit" className="submit-btn">Subscribe</button>
      </form>
    </div>
  );
}

export default Subscribe;
