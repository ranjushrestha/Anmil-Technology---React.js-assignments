import { Outlet } from "react-router-dom"


const Dashboard = () => {
  return (
    <div>
        <Outlet/>
      <h2>this is Dashboard</h2>
    </div>
  )
}

export default Dashboard
