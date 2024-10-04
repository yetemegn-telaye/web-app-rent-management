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
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    companyName: string;
    industry: string;
    spaceType: string;
    spaceId: string;
    tenantEmail: string;
    phoneNumber: string;
}

const initialTenants: Tenant[] = [
    {
        id: '0',
        firstName: '',
        middleName: '',
        lastName: '',
        companyName: '',
        industry: '',
        spaceType: '',
        spaceId: '',
        tenantEmail: '',
        phoneNumber: '',
    },
];

const AllTenant: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const allTenants = useSelector((state: RootState) => state.tenant.tenants) || initialTenants;
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllTenants());
    }, [dispatch]);

    return (
        <LandlordLayout>
            <div className="flex flex-col lg:flex-row items-center justify-between p-8 my-4 overflow-auto">
                <div className="flex flex-col items-start justify-between gap-2">
                    <h1 className="text-xl lg:text-2xl font-semibold text-secondary-dark">All Tenants</h1>
                    <span className="text-sm lg:text-base text-gray-500 font-light">View all tenants</span>
                </div>
                <div className="space-x-4 mt-4 lg:mt-0">
                    <button
                        onClick={() => navigate('/add-tenant')}
                        className="bg-primary-dark px-4 py-2 font-light text-white rounded-md"
                    >
                        <FontAwesomeIcon icon={faAdd} className="mr-2" /> Add Tenant
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(allTenants) && allTenants.length > 0 ? (
                    allTenants.map((tenant) => <TenantCard key={tenant.id} tenant={tenant} />)
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-danger">No tenants found</p>
                    </div>
                )}
            </div>
        </LandlordLayout>
    );
};

export default AllTenant;
