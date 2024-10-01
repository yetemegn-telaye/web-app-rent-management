import { faBars, faBell, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, useAppSelector } from '../redux/store';
import { useDispatch } from 'react-redux';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const tenantUser = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo') || '{}') : {};
    const managerUser = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo') || '{}') : {};
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = () => {

    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/'); 
  };

  return (
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
        <div className="relative">
          <span className="text-sm text-gray-500">ENGLISH</span>
          <i className="fas fa-chevron-down text-gray-500"></i>
        </div>
        
        <div className="relative">
          <Link to="/notifications" className="hover:bg-opacity-20">
            <FontAwesomeIcon icon={faBell} className="text-primary-dark" />
          </Link>
        </div>

        {/* User Info Section */}
        <div className="flex items-center space-x-2 text-sm">
          <img
            className="w-8 h-8 rounded-full"
            src="https://via.placeholder.com/150"
            alt="User"
          />
          <div className="flex flex-col font-light items-start">
            <span className="text-sm text-gray-700">
              {tenantUser.first_name !== '' ? tenantUser.first_name : managerUser.first_name}
            </span>
            <span className="text-sm text-gray-700">
              {managerUser.role !== '' ? managerUser.role : tenantUser.role}
            </span>
          </div>

   
          <button
            onClick={handleLogout}
            className="ml-4 text-sm text-white bg-danger px-3 py-1 rounded-md hover:bg-red-700"
          >
            <FontAwesomeIcon icon={faSignOut} className='text-center' />
     
          </button>
        </div>
      </div>

    
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white shadow-lg`}>
        <div className="p-4 border-t border-gray-200">
          <div className="relative mb-4">
            <span className="text-sm text-gray-500">ENGLISH</span>
            <FontAwesomeIcon icon="chevron-down" className="ml-2 text-gray-500" />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Manager</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://via.placeholder.com/150"
              alt="Manager"
            />
            <span className="text-sm text-gray-700">Abebe Daniel</span>
          </div>

          
          <div className="mt-4">
            <button
              onClick={handleLogout}
              className="w-full text-sm text-white bg-danger px-3 py-2 rounded-md hover:bg-red-700"
            >
                <FontAwesomeIcon icon={faSignOut} className='mr-2' />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
