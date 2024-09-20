import { Link } from "react-router-dom";
import LandlordLayout from "../../layout/LandlordLayout";
import MaintenanceCard from "./MaintenanceCard";
import { useState } from "react";
import RequestWorkOrder from "./RequestWorkOrder";


const maintainanceRequests = [
  {
      id: 1,
      spaceId: 'OFF01',
      spaceType: 'Office',
      damageType: 'Plumbing Fix',
      imageUrl: 'https://via.placeholder.com/150',
      status: 'Pending',
      requestDate: '2 days ago',
      acceptDate: 'sept 14 2024',
      startDate: 'sept 15 2024',
      finishDate: 'sept 16 2024',
  },
  {
      id: 2,
      spaceId: 'OFF01',
      spaceType: 'Commercial',
      damageType: 'Plumbing Fix',
      imageUrl: 'https://via.placeholder.com/150',
      status: 'Started',
      requestDate: '2 days ago',
      acceptDate: 'sept 14 2024',
      startDate: 'sept 15 2024',
      finishDate: 'sept 16 2024',
  },
  {
      id: 3,
      spaceId: 'OFF01',
      spaceType: 'Commercial',
      damageType: 'Plumbing Fix',
      imageUrl: 'https://via.placeholder.com/150',
      status: 'Done',
      requestDate: '2 days ago',
      acceptDate: 'sept 14 2024',
      startDate: 'sept 15 2024',
      finishDate: 'sept 16 2024',
  },
  {
      id: 4,
      spaceId: 'OFF01',
      spaceType: 'Commercial',
      damageType: 'Plumbing Fix',
      imageUrl: 'https://via.placeholder.com/150',
      status: 'Canceled',
      requestDate: '2 days ago',
      acceptDate: 'sept 14 2024',
      startDate: 'sept 15 2024',
      finishDate: 'sept 16 2024',
  }

];

type MaintenanceProps = {
  userType : 'landlord' | 'tenant';
}

const Maintenance: React.FC<MaintenanceProps> = ({userType}) => {
  const [showForm, setShowForm] = useState(false);

  const handleCreateNewClick = () => {
    setShowForm(true); 
  };
    return (
      <div className="bg-white flex flex-col gap-5 shadow-md h-full w-full p-8">
        {!showForm ? (
        <>
          <div className="flex items-center justify-center my-8">
            <button onClick={handleCreateNewClick} className="bg-primary-dark hover:bg-secondary-dark p-2 text-white font-bold rounded-lg shadow-md w-1/3">
              Create New Request
            </button>
          </div>
          {maintainanceRequests.map((request) => (
            <MaintenanceCard
              key={request.id}
              request={request}
              userType={userType}
            />
          ))}
        </>
      ) : (
        <RequestWorkOrder />
      )}
      
      </div>
    );
}
export default Maintenance;