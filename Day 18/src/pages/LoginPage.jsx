import React from "react";
import { useNavigate } from "react-router-dom";
import { useValidation } from "../hooks/ValidateHooks";

const LoginPage = () => {
  const navigate = useNavigate();

  // Default form values
  const defaultValues = {
    username: "",
    email: "",
    password: "",
  };

  // Validation rules
  const validationRules = {
    username: {
      required: "Username is required",
      pattern: {
        value: /^[a-zA-Z]{4,}$/,
        message: "Username must be at least 4 letters only",
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
      pattern: {
        value: /^.{8,}$/,
        message: "Password must be at least 8 characters",
      },
    },
  };

  // Use  validation hook
  const { register, handleSubmit, errors } = useValidation(defaultValues, validationRules);


  const onSubmit = (data) => { 
    navigate("/home", { state: { username: data.username } });
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" {...register("username", validationRules.username)}
           placeholder="Enter username" />
          {errors.username && <p className="error">{errors.username.message}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" {...register("email", validationRules.email)}
           placeholder="Enter email" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" {...register("password", validationRules.password)}
           placeholder="Enter password" />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
