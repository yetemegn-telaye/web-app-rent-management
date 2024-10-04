import LandlordLayout from "../../layout/LandlordLayout"
import OccupancyRateCard from "./OccupancyRateCard";
import RecentMaintenanceRequestComponent from "./RecentMaintenanceRequest";
import RevenueCard from "./UpcomingPaymentsCard";
import TotalEarningsCard from "./TotalEarningsCard";
import TotalListingsCard from "./TotalListingCard";
import TotalMaintenanceCostCard from "./PaymentsThisWeekCard";
import UpcomingPaymentsCard from "./UpcomingPaymentsCard";
import PaymentsThisWeekCard from "./PaymentsThisWeekCard";
import NewsCard from "./NewsCard";
import PieChart from "../../components/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getBuildingById } from "../property/buildingSlice";

const Dashboard: React.FC = ()=>{
    const dispatch = useDispatch<AppDispatch>();
    const buildingInfo = useSelector((state: RootState) => state.building.building);
    const manager = JSON.parse(localStorage.getItem('user') || '{}');
    const payments = [
        { amount: 500, status: 'upcoming', date: '12/12/2021', spaceType: 'office', spaceId: '00FF01' },
        { amount: 1000, status: 'upcoming', date: '12/12/2021', spaceType: 'office', spaceId: '00FF01' },
        { amount: 2000, status: 'delayed', date: '12/12/2021', spaceType: 'office', spaceId: '00FF01' },
       
    ];

    useEffect(()=>{
        dispatch(getBuildingById(manager.building_id));
    },[]);
   
    return(
        <LandlordLayout>
         <div className='flex items-center justify-between p-3 my-4 md:px-5 lg:px-10 overflow-auto'>
    <div className='flex flex-col items-start justify-between gap-2'>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-secondary-dark">Good Afternoon, Abebe Daniel</h1>
        <span className='text-xs md:text-sm text-gray-500 font-light'>Welcome back to your dashboard!</span>
    </div>
</div>
<div className="flex flex-col px-3 md:px-5 lg:px-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        <TotalListingsCard total={30} offices={20} commercial={10} />
        <OccupancyRateCard rate={62} />
        <div className="md:row-span-2 lg:row-span-2">
            <TotalEarningsCard officeRents={40} commercialRents={60} />
        </div>
        
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <UpcomingPaymentsCard revenue="57,852.000" lastMonth="data" lastWeek="data" />
        </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        <PaymentsThisWeekCard payments={payments} />
        <NewsCard/>
        <RecentMaintenanceRequestComponent requests={[
            { type: 'Plumbing Fix', status: 'pending', location: 'Office 00FF01' },
            { type: 'Plumbing Fix', status: 'pending', location: 'Office 00FF01' },
            { type: 'Plumbing Fix', status: 'pending', location: 'Office 00FF01' }
        ]} />
    </div>
</div>

                </LandlordLayout>       
       
    );
}
export default Dashboard;