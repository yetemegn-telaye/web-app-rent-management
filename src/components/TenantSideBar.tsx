import { faBuilding, faChevronCircleLeft, faChevronCircleRight, faCogs, faCreditCard, faList, faPlusSquare, faTachometerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TenantSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true); 
            } else {
                setIsCollapsed(false); // Expand on larger screens
            }
        };

  
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <aside className={`bg-white shadow-lg h-screen mt-1 transition-width duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="p-4">
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-700 focus:outline-none">
                    {isCollapsed ? (<FontAwesomeIcon icon={faChevronCircleRight} />) : (<FontAwesomeIcon icon={faChevronCircleLeft} />)}
                </button>
                <nav className="space-y-8 px-4 text-primary-dark font-medium mt-6">
                    <div className="flex flex-col gap-1 mb-6">
                        <h2 className={`text-xs font-medium text-accent uppercase tracking-wider mb-2 ${isCollapsed ? 'hidden' : ''}`}>Menu</h2>
                        <Link to="/my-rents" className="flex items-center p-2 hover:bg-gray-200 rounded">
                            <FontAwesomeIcon icon={faTachometerAlt} />
                            <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>My Rent</span>
                        </Link>
                     
                    </div>
                    <div className="flex flex-col gap-1">
                    <h2 className={`text-xs font-medium text-accent uppercase tracking-wider mb-2 ${isCollapsed ? 'hidden' : ''}`}>Listings</h2>
                        
                        <Link to="/all-listing" className="flex items-center p-2 hover:bg-gray-200 rounded">
                            <FontAwesomeIcon icon={faList} />
                            <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>All Listing</span>
                        </Link>
                        <Link to="/rented-listings" className="flex items-center p-2 hover:bg-gray-200 rounded">
                            <FontAwesomeIcon icon={faBuilding} />
                            <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Availabe Listings</span>
                        </Link>
                    </div>
                
                    <div className="">
                        <h2 className={`text-xs font-medium text-accent uppercase tracking-wider mb-3 ${isCollapsed ? 'hidden' : ''}`}>Administration</h2>
                       
                        <Link to="/all-payments" className="flex items-center p-2 hover:bg-gray-200 rounded">
                            <FontAwesomeIcon icon={faCreditCard} />
                            <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Payments</span>
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

export default TenantSidebar;
