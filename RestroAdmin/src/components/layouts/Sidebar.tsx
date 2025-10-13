import { NavLink } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaChartLine, 
  FaUsers, 
  FaUtensils, 
  FaShoppingCart, 
  FaCog, 
  FaBars, 
  FaTimes 
} from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/analytics", label: "Analytics", icon: <FaChartLine /> },
    { to: "/customers", label: "Customers", icon: <FaUsers /> },
    { to: "/menu", label: "Menu", icon: <FaUtensils /> },
    { to: "/order", label: "Order", icon: <FaShoppingCart /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
   <aside
  className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-black text-gray-600 p-5 flex flex-col pt-4
    transition-[width] duration-300 ease-in-out overflow-hidden
    ${isOpen ? "w-44" : "w-16 px-3"}
  `}
>

      {/* Toggle buttons inside sidebar */}
      <div className="flex justify-end mb-8">
        <button
          className="p-1 rounded hover:bg-gray-200 transition-colors focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <FaTimes className="w-6 h-6 text-white" /> : <FaBars className="w-6 h-6 text-white" />}
        </button>
      </div>

      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                isActive
                  ? "bg-black text-white font-bold rounded-md"
                  : "hover:bg-gray-200 hover:text-black rounded-md"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {isOpen && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
