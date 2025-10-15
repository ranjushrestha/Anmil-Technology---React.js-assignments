import React from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/UseLoginForm";

interface LoginFormData {
  username: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { formData, errors, handleChange, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    validations: {
      username: {
        required: true,
        validate: (value: string) => ({
          requirement: /^[a-zA-Z]{4,}$/.test(value),
          message: "Username must be at least 4 letters",
        }),
      },
      email: {
        required: true,
        validate: (value: string) => ({
          requirement: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          message: "Invalid email address",
        }),
      },
      password: {
        required: true,
        validate: (value: string) => ({
          requirement: /^.{8,}$/.test(value),
          message: "Password must be at least 8 characters",
        }),
      },
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Form Submitted:", data);
    localStorage.setItem("authToken", "bareer-auth-token");
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 ${
                errors.username
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-green-200"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-green-200"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 ${
                errors.password
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-green-200"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
