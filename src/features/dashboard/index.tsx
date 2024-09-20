import LandlordLayout from "../../layout/LandlordLayout"
import OccupancyRateCard from "./OccupancyRateCard";
import RecentMaintenanceRequestComponent from "./RecentMaintenanceRequest";
import RevenueCard from "./RevenueCard";
import TotalEarningsCard from "./TotalEarningsCard";
import TotalListingsCard from "./TotalListingCard";
import TotalMaintenanceCostCard from "./TotalMaintenanceCostCard";

const Dashboard: React.FC = ()=>{
    return(
        <LandlordLayout>
               <div className='flex items-center justify-between p-3 my-4 overflow-auto'>
                <div className='flex flex-col items-start justify-between gap-2'>
                    <h1 className="text-2xl font-semibold text-secondary-dark">Good Afternoon, Abebe Daniel</h1>
                    <span className='text-sm text-gray-500 font-light'>Welcome back to your dashboard!</span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 my-4">
                    <TotalListingsCard total={30} offices={20} commercial={10} />
                    <OccupancyRateCard rate={62} />
                    <TotalEarningsCard officeRents={40} commercialRents={60} />
                </div>
                <div className="grid grid-cols-1 gap-4 my-4">
                    <RevenueCard revenue="57,852.000" lastMonth="data" lastWeek="data" />
                    <TotalMaintenanceCostCard viewReport={() => console.log('View Report')} />
                </div>
                <div className="grid grid-cols-1 gap-4 my-4">
                    <RecentMaintenanceRequestComponent requests={[
                        { type: 'Plumbing Fix', status: 'pending', location: 'Office 00FF01' },
                        { type: 'Plumbing Fix', status: 'pending', location: 'Office 00FF01' }
                    ]} />
                </div>
                </LandlordLayout>       
       
    );
}
export default Dashboard;