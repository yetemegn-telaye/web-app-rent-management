import { Link } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";

const LandlordLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="maxn-h-screen bg-primary">
        <Header />
        <div className="flex text-sm"> 
            <Sidebar />
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    </div>
    );
};
export default LandlordLayout;
