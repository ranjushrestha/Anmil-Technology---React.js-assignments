import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("authToken", "bareerauthToken");
    navigate("/dashboard"); 
  };

  return (
    <div>
      <p>This is login page</p>
      <button
        style={{ backgroundColor: "green", color: "white",  }}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
