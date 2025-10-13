import { useState, useRef, useEffect } from "react";
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

interface User {
  name: string;
  avatar: string;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const user: User = {
    name: "Admin",
    avatar: "https://i.pravatar.cc/40",
  };

  const notificationCount = 3;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-screen h-16h-16 flex-shrink-0  bg-white shadow-sm px-6 py-3 flex items-center justify-between z-50">
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Logo" className="w-8 h-8" />
        <h1 className="text-xl font-semibold text-gray-800">RestroAdmin</h1>
      </div>

      <div className="flex-1 max-w-md mx-6 relative hidden sm:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none 
            focus:ring-offset-1 focus:ring-[#000] focus:border-[#000]"
        />
        <IoSearchOutline className="text-gray-400 absolute top-1/3 right-3" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <IoNotificationsOutline className="w-7 h-7 text-gray-700" />
          {notificationCount > 0 && (
            <span className="absolute -top-0 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center space-x-2 bg-transparent hover:bg-gray-100 px-3 py-2 rounded-full transition"
          >
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <span className="hidden sm:inline text-gray-700 font-medium">
              {user.name}
            </span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <a
                    href="#"
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="my-1 border-gray-200" />
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
