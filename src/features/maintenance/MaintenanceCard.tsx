import Maintenance from ".";

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
                <p className={`font-bold  ${status==='Canceled' ? 'text-red-700' : (status==='Pending' ? 'text-secondary-light' : 'text-primary-dark')}`}>{status}</p>
                {(status === 'Pending' && userType==='tenant') && <p className="text-gray-400 font-light">waiting for approval from management</p>}
                {userType === 'landlord' && <div className={` justify-between gap-3 ${status==='Pending'? 'flex' : 'hidden'}`}>
                    <button className="text-secondary-dark border border-secondary bg-white p-2 rounded-lg hover:bg-secondary-dark hover:bg-opacity-15">Accept</button>
                    <button className="bg-white text-red-600 border border-red-600 hover:bg-red-100 p-2 rounded-lg">Cancel</button>
                </div>
                }
                
            </div>
        </div>
    );
}
export default MaintenanceCard;