import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Maintenance from ".";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RequestViewModal from "./RequestViewModal";

type Maintenance = {
    spaceId: string,
    spaceType: string,
    damageType: string,
    imageUrl: string,
    status: string,
    requestDate: string,
    acceptDate: string,
    startDate: string,
    finishDate: string,
}
type MaintenanceCardProps = {
    request: Maintenance,
    userType: 'landlord' | 'tenant'
}


const MaintenanceCard: React.FC<MaintenanceCardProps> = ({request,userType}) => {
    const {spaceId,spaceType,damageType,imageUrl,status,requestDate,acceptDate, startDate, finishDate} =request;

    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const images = [
        { url: request.imageUrl, description: 'Fix image 1 description' },
        { url: request.imageUrl, description: 'Fix image 3 description' },
      ];

    const handleApprove = () => {
        console.log('Request Approved:', spaceId);
        // Add further logic to handle the approval
      };
    
      const handleOpenSlider = () => {
        setIsSliderOpen(true);
      };
    
      const handleCloseSlider = () => {
        setIsSliderOpen(false);
      };

    return (
        <div className="flex justify-between bg-primary border border-primary-dark shadow-md gap-10 items-center p-6 rounded-xl">
            <div className="flex gap-10">
            <img src="https://via.placeholder.com/150" alt="maintenance" className="h-24 w-24 rounded-lg" />
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{spaceType} ID: {spaceId} </h2>
                <p className="text-sm text-gray-500"><span className="text-secondary-dark mr-1">Damage Type:</span>{damageType}</p>
                <span className="text-xs text-gray-400">Requested: {requestDate} days ago</span>
            </div>
            </div>
            <div className="flex flex-col items-end gap-10">
                <p className={`font-bold  ${status==='Canceled' ? 'text-red-700' : (status==='Pending' ? 'text-secondary-light' : 'text-primary-dark')}`}>{status} </p>
                {(status === 'Pending' && userType==='tenant') && <p className="text-gray-400 font-light">waiting to be started</p>}
                {userType === 'landlord' && <div className={` justify-between gap-3 ${status==='Pending'? 'flex' : 'hidden'}`}>
                    <button className="text-secondary-dark border border-secondary bg-white p-2 rounded-lg hover:bg-secondary-dark hover:bg-opacity-15">Accept</button>
                    <button className="bg-white text-red-600 border border-red-600 hover:bg-red-100 p-2 rounded-lg">Cancel</button>
                </div>
                }

{status==='waiting for approval' && <div className={` justify-between gap-3 ${status==='waiting for approval'? 'flex' : 'hidden'}`}>
                    <button onClick={handleOpenSlider} className="text-secondary-dark border border-secondary bg-white p-2 rounded-lg hover:bg-secondary-dark hover:bg-opacity-15"><FontAwesomeIcon icon={faEye}/> </button>
                    
                </div>
                }
                {isSliderOpen && <RequestViewModal images={images} onClose={handleCloseSlider} />}
            </div>
        </div>
    );
}
export default MaintenanceCard;