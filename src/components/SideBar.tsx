import { faBuilding, faChevronCircleLeft, faChevronCircleRight, faCogs, faCreditCard, faList, faPlusSquare, faTachometerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Set the initial state based on the screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true); // Collapse on small screens
            } else {
                setIsCollapsed(false); // Expand on larger screens
            }
        };

        // Check the screen size on first render
        handleResize();

        // Add event listener to handle screen resize
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
                <nav className="space-y-2 text-primary-dark font-medium mt-6">
                    <div className="flex flex-col gap-1 mb-6">
                        <h2 className={`text-xs font-medium text-accent uppercase tracking-wider mb-2 ${isCollapsed ? 'hidden' : ''}`}>Menu</h2>
                        <Link to="/" className="flex items-center p-2 hover:bg-gray-200 rounded">
                            <FontAwesomeIcon icon={faTachometerAlt} />
                            <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Dashboard</span>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Link to="/add-listing" className="flex items-center p-2 hover:bg-gray-200 rounded">
                            <FontAwesomeIcon icon={faPlusSquare} />
                            <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Add Listing</span>
                        </Link>
                        <Link to="/all-listing" className="flex items-center p-2 hover:bg-gray-200 rounded">
                            <FontAwesomeIcon icon={faList} />
                            <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>All Listing</span>
                        </Link>
                        <Link to="/rented-listings" className="flex items-center p-2 hover:bg-gray-200 rounded">
                            <FontAwesomeIcon icon={faBuilding} />
                            <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Rented Listings</span>
                        </Link>
                    </div>
                    <div className="pt-10">
                        <h2 className={`text-xs font-medium text-accent uppercase tracking-wider mb-3 ${isCollapsed ? 'hidden' : ''}`}>Administration</h2>
                        <Link to="/tenants" className="flex items-center p-2 hover:bg-gray-200 rounded">
                            <FontAwesomeIcon icon={faUser} />
                            <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Tenants</span>
                        </Link>
                        <Link to="/payments" className="flex items-center p-2 hover:bg-gray-200 rounded">
                            <FontAwesomeIcon icon={faCreditCard} />
                            <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Payments</span>
                        </Link>
                        <Link to="/property" className="flex items-center p-2 hover:bg-gray-200 rounded">
                            <FontAwesomeIcon icon={faBuilding} />
                            <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Property</span>
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
