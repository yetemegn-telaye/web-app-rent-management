import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import RequestViewModal from "./RequestViewModal";
import { Maintenance } from "../../types/maintenance-request";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { startMaintenance } from "./maintenanceSlice";



type MaintenanceCardProps = {
  request: Maintenance;

};

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ request}) => {

 const dispatch = useDispatch<AppDispatch>();
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);


  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const images = [
    { url: request.pictures[0], description: "Fix image 1 description" },
    { url: request.pictures[1], description: "Fix image 3 description" },
  ];

    const handleStartRequest = () => {
        dispatch(startMaintenance(request.id));
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
        <img
          src="https://via.placeholder.com/150"
          alt="maintenance"
          className="h-24 w-24 rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">
          <span className="text-secondary-dark mr-1">Damage Type:</span>
          {request.maintenance_type}
          </h2>
          <p className="text-sm text-gray-500">
            
           {request.description}
          </p>
          <span className="text-xs text-gray-400">
            Requested At: {request.created_at}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-10">
        <p
          className={`font-bold  ${
            request.status === "canceled"
              ? "text-red-700"
              : request.status === "pending"
              ? "text-secondary-light"
              : "text-primary-dark"
          }`}
        >
          {request.status}{" "}
        </p>
        {request.status === "waiting_to_be_started" && role === "tenant" && (
          <p className="text-gray-400 font-light">{request.status}</p>
        )}
        {role === "building_manager" && request.status==="wainting_to_be_started" ? (
          <div className={`justify-between gap-3`}>
            <button className="text-secondary-dark border border-secondary bg-white p-2 rounded-lg hover:bg-secondary-dark hover:bg-opacity-15"
            onClick={handleStartRequest}
            >
              Start Fix
            </button>
            <button className="bg-white text-red-600 border border-red-600 hover:bg-red-100 p-2 rounded-lg">
              Cancel
            </button>
          </div>
        ):null}
       
  

        {request.status === "waiting_for_approval" || request.status==='ongoing' ? (
          <div className={`justify-between gap-3 `}>
            <button
              onClick={handleOpenSlider}
              className="text-secondary-dark border border-secondary bg-white p-2 rounded-lg hover:bg-secondary-dark hover:bg-opacity-15"
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        ):null}
        {isSliderOpen && <RequestViewModal requestId={request.id} images={images} onClose={handleCloseSlider} />}
      </div>
    </div>
  );
};

export default MaintenanceCard;
