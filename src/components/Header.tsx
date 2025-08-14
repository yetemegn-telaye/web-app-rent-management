import { faBars, faBell, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'; 
import LogoutModal from './LogoutModal';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const { user, userType, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <>
      <header className="bg-white shadow-lg px-6 py-4 flex justify-between items-center w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-between gap-2 text-lg font-light">
            <div className='w-10 h-10 border border-dark font-bold text-dark rounded-full flex items-center justify-center'>AM</div>
            Ambassador Mall
          </div>

          <button
            className="text-gray-700 focus:outline-none lg:hidden"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        {/* Right Section */}
        <div className="hidden w-1/2 lg:flex items-center space-x-6 justify-end">
          <span className="text-sm text-gray-500">ENGLISH</span>
          <Link to="/notifications">
            <FontAwesomeIcon icon={faBell} className="text-primary-dark" />
          </Link>

          <div className="flex items-center space-x-2 text-sm">
            <img
              className="w-8 h-8 rounded-full"
              src="https://avatar.iran.liara.run/public"
              alt="User"
            />
            <div className="flex flex-col font-light items-start">
              <span className="text-sm text-gray-700">{displayName}</span>
              <span className="text-sm text-gray-700">{userType || "Unknown"}</span>
            </div>

            {/* ✅ Toggle Logout Modal (desktop) */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="ml-4 text-sm text-white bg-danger px-3 py-1 rounded-md hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faSignOut} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white shadow-lg`}>
          <div className="p-4 border-t border-gray-200">
            <div className="relative mb-4">
              <span className="text-sm text-gray-500">ENGLISH</span>
            </div>

            <div className="flex items-center space-x-2">
              <img
                className="w-8 h-8 rounded-full"
                src="https://avatar.iran.liara.run/public"
                alt="User"
              />
              <span className="text-sm text-gray-700">{displayName}</span>
              <span className="text-sm text-gray-700">{userType || "Unknown"}</span>
            </div>

            <div className="mt-4">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full text-sm text-white bg-danger px-3 py-2 rounded-md hover:bg-red-700"
              >
                <FontAwesomeIcon icon={faSignOut} className='mr-2' />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 🔐 Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
