import { useState } from "react";
import "../App.css"; 

function Signup() {
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
      console.log("Form submitted:", formData);
      alert("Form submitted!");
      setFormData({ username: "", email: "", password: "", terms: false });
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup Form</h2>

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
              {showPassword ? "Hide" : "Show"}
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

        <button type="submit" className="submit-btn">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
