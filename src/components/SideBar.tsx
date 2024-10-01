import { faBuilding, faChevronCircleLeft, faChevronCircleRight, faCogs, faCreditCard, faList, faPlusSquare, faTachometerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = window.localStorage.getItem('role');
    setRole(storedRole);

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <aside className={`bg-white shadow-lg h-100vh mt-1 transition-width duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-700 focus:outline-none">
          {isCollapsed ? (<FontAwesomeIcon icon={faChevronCircleRight} />) : (<FontAwesomeIcon icon={faChevronCircleLeft} />)}
        </button>
        <nav className="space-y-8 px-4 text-primary-dark font-medium mt-6">
        
          <div className={`flex flex-col gap-1 mb-6 ${role==='tenant' ? 'hidden' : ''}`}>
            <h2 className={`text-xs font-medium text-accent uppercase tracking-wider mb-2 ${isCollapsed ? 'hidden' : ''}`}>Menu</h2>
            <Link to="/dashboard" className={`flex items-center p-2 hover:bg-gray-200 rounded ${role === 'tenant' ? 'hidden' : ''}`}>
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Dashboard</span>
            </Link>
          </div>

     
          <div className="flex flex-col gap-1">
            <h2 className={`text-xs font-medium text-accent uppercase tracking-wider mb-2 ${isCollapsed ? 'hidden' : ''}`}>Listings</h2>
            <Link to="/add-listing" className={`flex items-center p-2 hover:bg-gray-200 rounded ${role === 'tenant' ? 'hidden' : ''}`}>
              <FontAwesomeIcon icon={faPlusSquare} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Add Listing</span>
            </Link>
            <Link to="/all-listing" className="flex items-center p-2 hover:bg-gray-200 rounded">
              <FontAwesomeIcon icon={faList} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>All Listings</span>
            </Link>
            <Link to="/my-rents" className={`flex items-center p-2 hover:bg-gray-200 rounded ${role === 'building_manager' ? 'hidden' : ''}`}>
              <FontAwesomeIcon icon={faBuilding} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>My Rent</span>
            </Link>
          </div>

          <div className={`flex flex-col gap-1 ${role === 'tenant' ? 'hidden' : ''}`}>
            <h2 className={`text-xs font-medium text-accent uppercase tracking-wider mb-2 ${isCollapsed ? 'hidden' : ''}`}>Tenants</h2>
            <Link to="/add-tenant" className="flex items-center p-2 hover:bg-gray-200 rounded">
              <FontAwesomeIcon icon={faPlusSquare} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Add Tenant</span>
            </Link>
            <Link to="/all-tenants" className="flex items-center p-2 hover:bg-gray-200 rounded">
              <FontAwesomeIcon icon={faList} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>All Tenants</span>
            </Link>
          </div>


          <div className={`flex flex-col gap-1 ${role === 'tenant' ? 'hidden' : ''}`}>
            <h2 className={`text-xs font-medium text-accent uppercase tracking-wider mb-3 ${isCollapsed ? 'hidden' : ''}`}>Administration</h2>
            <Link to="/all-payments" className="flex items-center p-2 hover:bg-gray-200 rounded">
              <FontAwesomeIcon icon={faCreditCard} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Payments</span>
            </Link>
            <Link to="/property" className="flex items-center p-2 hover:bg-gray-200 rounded">
              <FontAwesomeIcon icon={faBuilding} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Property</span>
            </Link>
            <Link to="/" className="flex items-center p-2 hover:bg-gray-200 rounded">
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Report</span>
            </Link>
            <Link to="/settings" className="flex items-center p-2 hover:bg-gray-200 rounded">
              <FontAwesomeIcon icon={faCogs} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Settings</span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
