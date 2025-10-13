import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <h2>This is Dashboard</h2>
      <button style={{ backgroundColor: "red", color: "white",  }}  onClick={handleLogout}>Logout</button>
      <Outlet />
    </div>
  );
};

export default Dashboard;
