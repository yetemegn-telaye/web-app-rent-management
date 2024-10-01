import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LandlordLayout from '../../layout/LandlordLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import OptionsSection from '../../components/OptionsSection';
import image1 from '../../assets/images/office1.webp';
import image2 from '../../assets/images/office2.jpg';
import image3 from '../../assets/images/office3.jpg';
import Dropdown from '../../components/Dropdown';
import ImageSlider from '../../components/ImageSlider';
import ListingFeatures from './ListingFeatures';
import Payment from '../payment';
import DocView from '../agreement';
import Maintenance from '../maintenance';
import Agreement from '../agreement';
import { listings } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { RootState } from '../../redux/store';
import { getListingById } from './listingSlice';
import { getAllTenants } from '../tenant/tenantSlice';
import { getPaymentByTenant, getTotalPaymentBySpace } from '../payment/paymentSlice';



const ListingDetail: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>(); 
    const all_lease= useSelector((state: RootState) => state.agreement.agreements);
    
    const listingId = id ? parseInt(id) : 0;
    const current_lease = all_lease.find((lease) => lease.space_id === listingId);
    const total_payment_by_space = useSelector((state: RootState) => {
        const totalPaymentData = state.payment.total_payment_by_space;
        return Array.isArray(totalPaymentData) ? { totalPayment: 0 } : totalPaymentData;
      }) as { totalPayment: number };

    const defaultTenant = {
        id: 0,
        first_name: '',
        middle_name: '',
        last_name: '',
        company_name: '',
        industry: '',
        email: '',
        phone_number: '',
        lease_id: 0
    }

    const defaultPayment = [{
        id: 0,
        invoice_id: 0,
        invoice_image: [],
        status: "-",
        due_date: "-",
        paid_date: "-",
        payment_price: 0,
        utility_price: 0,
        total_rent_price: 0,
        paid_by: 0,
        space_id: 0,
        tenant_id: 0,
        lease_id: 0
    }];
    const current_tenant = (useSelector((state: RootState) => state.tenant.tenants))?.find((tenant) => tenant.lease_id === current_lease?.id) || defaultTenant;
    const payments = useSelector((state: RootState) => state.payment.payments) || defaultPayment;
    const [currentStatus, setCurrentStatus] = useState<string>('');
    const statDropDownOptions = ['open_for_rent', 'occupied','closed'];

    const buttonOptions = [
        { label: 'Document',primary: true  },
        { label: 'Features'},
        { label: 'Payments' },
        { label: 'Maintenance' }
    ];
    const defaultSpace = {
        space_purpose: '',
        size: '',
        number_of_views: 0,
        floor: 0,
        number_of_rooms: 0,
        price: 0,
        space_status: ''
    };
    const space = useSelector((state: RootState) => state.listing.listing) || defaultSpace;

    useEffect(()=>{
        dispatch(getListingById(listingId));
        dispatch(getAllTenants());
       });

       useEffect(()=>{
            dispatch(getPaymentByTenant(current_tenant.id));
            dispatch(getTotalPaymentBySpace(listingId));
       });





    const handleSelectedStatus = (status: string) => {
        setCurrentStatus(status);
    }

    
    if (space?.space_status.toLowerCase() === 'occupied') {
        buttonOptions.unshift({ label: 'Maintenance' });
        buttonOptions.unshift({ label: 'Payments' });
       
    }

    const [selectedOption, setSelectedOption] = useState(buttonOptions[0].label);

    const renderContent = () => {
        console.log('space',space,space.id);
        switch (selectedOption) {
            case 'Features':
                return <ListingFeatures spaceId={space.id} />;
            case 'Document':
                return <Agreement isClosed={space?.space_status.toLowerCase() === 'occupied'} />; 
            case 'Payments':
                return <Payment userType='landlord' totalPayment={total_payment_by_space.totalPayment} all_payments={payments}/>;
         
            case 'Maintenance':
                return <Maintenance userType='landlord'/>;
            default:
                return <div></div>;
        }
       
    };

    return (
        <LandlordLayout>
<div className="flex flex-col lg:flex-row items-center justify-between p-3 my-4">
    <div className="flex flex-col items-start justify-between gap-2">
        <h1 className="text-xl lg:text-2xl font-semibold text-secondary-dark">
            {space.space_purpose.toUpperCase()} Space
        </h1>
        <span className="text-sm lg:text-base text-gray-500 font-light">
            Listing detail page for ID: {id}
            
        </span>
    </div>
    <div className="mt-4 lg:mt-0 flex flex-wrap gap-2">
        <button className="bg-primary-dark px-4 py-1 font-light text-white rounded-md">
            <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
    </div>
</div>


<div className="flex flex-col lg:flex-row gap-4">

    <div className="flex flex-col items-center p-4 w-full lg:w-2/5 bg-white shadow-md rounded-lg">
        <ImageSlider images={[image1, image2, image3, image1]} />
        
        <div className="flex-1 w-full">
            <div className="flex items-center justify-between px-3 my-4">
                <p className="text-lg lg:text-xl font-semibold text-primary-dark">{space.space_purpose}</p>
                <p className="text-secondary-light">{space.number_of_views} views</p>
            </div>

            <div className="px-4 space-y-2">
                <hr className="my-4" />
                <p className="text-gray-500">Area: {space.size} sq ft.</p>
                <p className="text-gray-500">Floor: {space.floor}</p>
                <p className="text-gray-500">Furnished: No</p>
                <p className="text-gray-500">Number of rooms: {space.number_of_rooms}</p>
                <p className="text-gray-500">Price: {space.price} ETB</p>
                
                <div className="py-4">
                    <label className="text-sm font-semibold text-gray-700">Current Status</label>
                    <Dropdown label={space.space_status} options={statDropDownOptions} onSelect={handleSelectedStatus} />
                </div>
            </div>

            {space?.space_status.toLowerCase() === 'occupied' && (
                <div className="mt-4 text-center">
                    <button className="py-2 px-4 bg-primary-dark hover:bg-secondary-dark text-white rounded-md">
                        <FontAwesomeIcon icon={faUserAlt} className='mr-3'/>
                        Contact Tenant
                    </button>
                </div>
            )}
        </div>
    </div>

 
    <div className="flex flex-col w-full lg:w-3/5">
        <OptionsSection 
            buttonOptions={buttonOptions} 
            selectedOption={selectedOption} 
            onOptionSelected={(label) => setSelectedOption(label)} 
        />
        <div className="flex flex-col h-full relative">
            {renderContent()}
        </div>
    </div>
</div>


        </LandlordLayout>
    );
};

export default ListingDetail;
