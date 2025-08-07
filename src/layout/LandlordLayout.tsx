import { Link } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";

const LandlordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-primary">
      {/* Header */}
      <Header />

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="h-full w-64 bg-white shadow-md border-r border-gray-200 overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-0 p-6">
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">{children}</div>

          {/* Footer */}
          <footer className="py-2 border-t-2 items-center border-gray-200">
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
