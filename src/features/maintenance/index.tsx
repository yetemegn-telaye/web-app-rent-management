import { Link } from "react-router-dom";
import LandlordLayout from "../../layout/LandlordLayout";
import MaintenanceCard from "./MaintenanceCard";
import { useEffect, useState } from "react";
import RequestWorkOrder from "./RequestWorkOrder";
import plumbingImg from '../../assets/images/plumbing.webp';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllMaintenance } from "./maintenanceSlice";


type MaintenanceProps = {
  spaceId: number;
};
const Maintenance: React.FC<MaintenanceProps> = ({spaceId}) => {
  const [showForm, setShowForm] = useState(false);
  const all_maintenance = useSelector((state: RootState) => state.maintenance.all_maintenance) || [{}];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllMaintenance());
  },[]);

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
          {all_maintenance.map((request) => (
            <MaintenanceCard
              key={request.id}
              request={request}
             
            />
          ))}
        </>
      ) : (
        <RequestWorkOrder spaceId={spaceId} setShowForm={setShowForm} />
      )}
      
      </div>
    );
}
export default Maintenance;