import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="container-custom flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-primary-700 flex items-center"
        >
          <svg
            className="w-8 h-8 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          NotesApp
        </Link>

        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className={`text-gray-700 hover:text-primary-600 font-medium ${
                  location.pathname === "/" ? "text-primary-600" : ""
                }`}
              >
                My Notes
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-primary-600 font-medium"
              >
                <FiLogOut className="mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-gray-700 hover:text-primary-600 font-medium ${
                  location.pathname === "/login" ? "text-primary-600" : ""
                }`}
              >
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-md py-2 absolute left-0 right-0 z-10 animate-fade-in">
          <div className="flex flex-col space-y-3 px-6 py-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`text-gray-700 hover:text-primary-600 font-medium py-2 ${
                    location.pathname === "/" ? "text-primary-600" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Notes
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-gray-700 hover:text-primary-600 font-medium py-2"
                >
                  <FiLogOut className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-gray-700 hover:text-primary-600 font-medium py-2 ${
                    location.pathname === "/login" ? "text-primary-600" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
