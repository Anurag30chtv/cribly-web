import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  // Navigation items configuration
  const navItems = [
    { path: ROUTES.HOME, label: 'Home', visible: true },
    { path: ROUTES.LISTINGS, label: 'Browse PGs', visible: true },
    { 
      path: ROUTES.ADD_LISTING, 
      label: 'Add Listing', 
      visible: currentUser?.role === 'owner' 
    },
    { 
      path: ROUTES.DASHBOARD, 
      label: currentUser?.role === 'owner' ? 'Owner Dashboard' : 'My Dashboard', 
      visible: !!currentUser 
    },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={ROUTES.HOME} className="text-xl font-bold text-indigo-600">
              Cribly
            </Link>
          </div>
          
          <div className="hidden sm:flex items-center space-x-4">
            {navItems.map((item) => (
              item.visible && (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
          
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}