import { Link } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import TenantSidebar from "../components/TenantSideBar";

const LandlordLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-h-vh bg-primary">
        <Header />
        <div className="flex text-sm"> 
            <Sidebar />
            {/* <TenantSidebar/> */}
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    </div>
    );
};
export default LandlordLayout;
