import { Link } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import TenantSidebar from "../components/TenantSideBar";

const LandlordLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-h-screen bg-primary">
        <Header />
        <div className="flex bg-primary text-sm"> 
            <Sidebar />
            {/* <TenantSidebar/> */}
            <main className="flex-1 p-6">
                {children}
                <p className="text-center my-4 text-sm text-gray-500">
              Copyright © 2024 XPProperty
        </p>
            </main>
       
        </div>
       
    </div>
    );
};
export default LandlordLayout;
