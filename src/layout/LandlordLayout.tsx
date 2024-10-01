import { Link } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";


const LandlordLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" min-h-screen flex flex-col bg-primary">
        <Header />
        <div className="flex flex-1 bg-primary text-sm"> 
            <Sidebar />

            <main className="flex-1 flex flex-col justify-between p-6">
                <div className="flex-1">
                {children}
                </div>
               
       
                <footer className="mt-6 py-4">
        <p className="text-center text-sm text-gray-500">
          Copyright © 2024 XPProperty
        </p>
      </footer>
            </main>
       
        </div>
       
    </div>
    );
};
export default LandlordLayout;
