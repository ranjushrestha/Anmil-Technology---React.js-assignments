import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Sidebar from "../components/layouts/Sidebar";

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen">
      
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main section */}
      <div
        className={`flex flex-col flex-1 bg-gray-100 transition-[margin] duration-300 ease-in-out ${
    isSidebarOpen ? "ml-44" : "ml-16"
        } mt-16 `}
      >
        <Header />

        {/* Main content area */}
     <main className="flex-grow p-6 mt-10 overflow-auto">
  <Outlet />
</main>


        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
