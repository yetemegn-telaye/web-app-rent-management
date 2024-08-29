import { Link } from "react-router-dom";
import Sidebar from "../components/SideBar";

const LandlordLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-primary">
        {/* Navbar */}
        <header className="bg-white shadow-lg px-6 py-4 flex justify-between items-center w-full">
            <div className="flex items-center">
                <button className="text-gray-700 focus:outline-none lg:hidden mr-4">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="text-gray-800 text-lg font-semibold">Ambassador Mall</div>
                <div className="text-sm text-gray-500 ml-2">Property Detail</div>
            </div>
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <span className="text-sm text-gray-500">ENGLISH</span>
                    <i className="fas fa-chevron-down ml-2 text-gray-500"></i>
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
            </div>
        </header>

        {/* Main Content Area */}
        <div className="flex text-sm">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg h-screen mt-1">
                <div className="p-12">
                  
                    <nav className="space-y-2 text-primary-dark font-medium">
                        <div className="flex flex-col gap-1 mb-6">
                        <h2 className="text-xs font-medium text-accent uppercase tracking-wider mb-2">Menu</h2>
                        <Link to="/" className="flex items-center p-2  hover:bg-gray-200 rounded">
                            <i className="fas fa-tachometer-alt"></i>
                            <span className="ml-3">Dashboard</span>
                        </Link>
                        </div>
                        <div className="flex flex-col gap-1">
                        <Link to="/add-listing" className="flex items-center p-2 hover:bg-gray-200 rounded">
                            <i className="fas fa-plus-square"></i>
                            <span className="ml-3">Add Listing</span>
                        </Link>
                        <Link to="/all-listing" className="flex items-center p-2  hover:bg-gray-200 rounded">
                            <i className="fas fa-list"></i>
                            <span className="ml-3">All Listing</span>
                        </Link>
                        <Link to="/rented-listings" className="flex items-center p-2  hover:bg-gray-200 rounded">
                            <i className="fas fa-building"></i>
                            <span className="ml-3">Rented Listings</span>
                        </Link>
                        </div>
                        <div className="pt-10">
                           
                            <h2 className="text-xs font-medium text-accent uppercase tracking-wider mb-3">Administration</h2>
                            <Link to="/tenants" className="flex items-center p-2  hover:bg-gray-200 rounded">
                                <i className="fas fa-users"></i>
                                <span className="ml-3">Tenants</span>
                            </Link>
                            
                            <Link to="/payments" className="flex items-center p-2  hover:bg-gray-200 rounded">
                                <i className="fas fa-credit-card"></i>
                                <span className="ml-3">Payments</span>
                            </Link>
                            <Link to="/property" className="flex items-center p-2  hover:bg-gray-200 rounded">
                                <i className="fas fa-building"></i>
                                <span className="ml-3">Property</span>
                            </Link>
                            <Link to="/settings" className="flex items-center p-2  hover:bg-gray-200 rounded">
                                <i className="fas fa-cogs"></i>
                                <span className="ml-3">Settings</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    </div>
    );
};
export default LandlordLayout;
