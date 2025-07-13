import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu } from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      setUser(savedUser);
    } else {
      setUser(null);
    }
    setDropdownOpen(false); // Close dropdown on route change
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-zinc-800 shadow px-4 py-3 relative">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Icon */}
        {user && (
          <div className="relative md:hidden">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-800 dark:text-white"
            >
              <Menu size={22} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-10 left-0 bg-white dark:bg-zinc-700 border dark:border-zinc-600 rounded-md shadow-md p-4 w-48 z-50">
                <Link to="/" onClick={() => setDropdownOpen(false)} className="block text-sm text-gray-800 dark:text-white py-1">🏠 Home</Link>
                <Link to="/learning" onClick={() => setDropdownOpen(false)} className="block text-sm text-gray-800 dark:text-white py-1">🎓 My Learning</Link>
                <Link to="/certificates" className="text-sm text-gray-800 dark:text-white py-1">🧾 Certificates</Link>
              </div>
            )}
          </div>
        )}

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
          📚 CourseHub
        </Link>

        {/* Desktop Nav */}
        {user && (
          <div className="hidden md:flex gap-4 ml-6">
            <Link to="/" className="text-sm text-gray-800 dark:text-white py-1">🏠 Home</Link>
            <Link to="/learning" className="text-sm text-gray-800 dark:text-white py-1">🎓 My Learning</Link>
            <Link to="/certificates" className="text-sm text-gray-800 dark:text-white py-1">🧾 Certificates</Link>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Show User Name on All Screens */}
        {user && (
          <span className="text-sm text-gray-700 dark:text-gray-200">
            👤 {user.firstName} {user.lastName}
          </span>
        )}

        {/* Dark mode toggle */}
        <button onClick={toggleDarkMode} className="text-gray-800 dark:text-white">
          <Moon className="w-5 h-5 dark:hidden" />
          <Sun className="w-5 h-5 hidden dark:inline" />
        </button>

        {/* Auth */}
        {user ? (
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
