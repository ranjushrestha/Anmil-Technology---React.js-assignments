import  { useState } from "react";
import { Navigate } from "react-router";
import useForm from "../hooks/useForm";
import "../App.css";

const LoginPage = () => {
  const [redirect, setRedirect] = useState(false); 

  const { formData, errors, handleChange, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    validations: {
      username: {
        required: true,
        validate: (value) => ({
          requirement: /^[a-zA-Z]{4,}$/.test(value),
          message: "Username must be at least 4 letters only",
        }),
      },
      email: {
        required: true,
        validate: (value) => ({
          requirement: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          message: "Invalid email address",
        }),
      },
      password: {
        required: true,
        validate: (value) => ({
          requirement: /^.{8,}$/.test(value),
          message: "Password must be at least 8 characters",
        }),
      },
    },
  });


  const onSubmit = (data) => {
    localStorage.setItem("token", "12345");
    setRedirect(true); 
  };


  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form" noValidate>
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
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
