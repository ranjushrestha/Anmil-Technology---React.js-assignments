import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import ContactUs from "../pages/ContactUs";
import NotFoundPage from "../pages/NotFoundPage";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Setting from "../pages/Setting";
import Student from "../pages/Student";
import StudentDetailsPage from "../pages/StudentDetailsPage";
import Login from "../pages/Login";
import ProtectedRoute from "../route/ProtectedRouter";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/students" element={<Student />} />
        <Route path="/students/:studentId" element={<StudentDetailsPage />} />

      
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
           
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
