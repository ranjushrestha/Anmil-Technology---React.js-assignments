import { Link } from "react-router-dom"

const Profile = () => {
  return (
    <div>
      <p>Profile page </p>
      <Link to="/dashboard/setting">Go to Setting"</Link>
    </div>
  )
}

export default Profile
