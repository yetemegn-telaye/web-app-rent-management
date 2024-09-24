import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LandlordLayout from "../../layout/LandlordLayout";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import TenantCard from "./TenantCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getAllTenants } from "./tenantSlice";
import { useNavigate } from "react-router-dom";


interface Tenant {
    id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    companyName: string,
    industry: string,
    spaceType: string,
    spaceId: string,
    tenantEmail: string,
    phoneNumber: string
}

const tenants: Tenant[] = [
    {
    id: '1',
    firstName: 'Samuel',
    middleName: 'Abebe',
    lastName: 'Daniel',
    companyName: 'Walls Trading PLC.',
    industry: 'Construction',
    spaceType: 'Office',
    spaceId: '0FFO1',
    tenantEmail: 'samuel@walls.com',
    phoneNumber: '+251911092345'
    },
    {
        id: '2',
        firstName: 'Samuel',
        middleName: 'Abebe',
        lastName: 'Daniel',
        companyName: 'Walls Trading PLC.',
        industry: 'Construction',
        spaceType: 'Office',
        spaceId: '0FFO1',
        tenantEmail: 'samuel@walls.com',
        phoneNumber: '+251911092345'
        },
        {
            id: '3',
            firstName: 'Samuel',
            middleName: 'Abebe',
            lastName: 'Daniel',
            companyName: 'Walls Trading PLC.',
            industry: 'Construction',
            spaceType: 'Office',
            spaceId: '0FFO1',
            tenantEmail: 'samuel@walls.com',
            phoneNumber: '+251911092345'
            },
            {
                id: '4',
                firstName: 'Samuel',
                middleName: 'Abebe',
                lastName: 'Daniel',
                companyName: 'Walls Trading PLC.',
                industry: 'Construction',
                spaceType: 'Office',
                spaceId: '0FFO1',
                tenantEmail: 'samuel@walls.com',
                phoneNumber: '+251911092345'
                },
                {
                    id: '4',
                    firstName: 'Samuel',
                    middleName: 'Abebe',
                    lastName: 'Daniel',
                    companyName: 'Walls Trading PLC.',
                    industry: 'Construction',
                    spaceType: 'Office',
                    spaceId: '0FFO1',
                    tenantEmail: 'samuel@walls.com',
                    phoneNumber: '+251911092345'
                    },
                    {
                        id: '4',
                        firstName: 'Samuel',
                        middleName: 'Abebe',
                        lastName: 'Daniel',
                        companyName: 'Walls Trading PLC.',
                        industry: 'Construction',
                        spaceType: 'Office',
                        spaceId: '0FFO1',
                        tenantEmail: 'samuel@walls.com',
                        phoneNumber: '+251911092345'
                        },
];
const AllTenant: React.FC = ()=>{
    const dispatch = useDispatch<AppDispatch>();
    const allTenants = useSelector((state: RootState) => state.tenant.tenants);
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(getAllTenants());
    // },[dispatch,allTenants]);


    return(
      <LandlordLayout>
           <div className="flex flex-col lg:flex-row items-center justify-between p-8 my-4 overflow-auto">
                <div className="flex flex-col items-start justify-between gap-2">
                    <h1 className="text-xl lg:text-2xl font-semibold text-secondary-dark">All Tenants</h1>
                    <span className="text-sm lg:text-base text-gray-500 font-light">view all tenants</span>
                </div>
                <div className="space-x-4 mt-4 lg:mt-0">
                    <button onClick={()=>navigate('/add-tenant')} className="bg-primary-dark px-4 py-2 font-light text-white rounded-md">
                        <FontAwesomeIcon icon={faAdd} className="mr-2" /> Add Tenant
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tenants.map((tenant) => (
                    <TenantCard key={tenant.id} {...tenant} />
                ))}
            </div>
      </LandlordLayout>  
    )
}
export default AllTenant;