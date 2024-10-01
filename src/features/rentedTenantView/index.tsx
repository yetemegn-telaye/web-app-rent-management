import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LandlordLayout from '../../layout/LandlordLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons';
import OptionsSection from '../../components/OptionsSection';
import image1 from '../../assets/images/office1.webp';
import image2 from '../../assets/images/office2.jpg';
import image3 from '../../assets/images/office3.jpg';
import Dropdown from '../../components/Dropdown';
import ImageSlider from '../../components/ImageSlider';
import ListingFeatures from '../listings/ListingFeatures';
import Payment from '../payment';
import DocView from '../agreement';
import Maintenance from '../maintenance';
import Agreement from '../agreement';
import { Link } from 'react-router-dom';
import Reminders from './Reminders';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getPaymentByTenant, getTotalPaymentBySpace } from '../payment/paymentSlice';
import { Lease } from '../../types/lease';
import { getAllAgreements } from '../agreement/agreementSlice';
import { Tenant } from '../../types/tenant';
import { TenantUser } from '../../types/authentication';
import { Space } from '../../types/space';
import { getAllListings } from '../listings/listingSlice';




const MyRent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
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
        lease_id: 0,
      }];

      const defaultLease : Lease = {
        id: 0,
        lease_start_date: '',
        lease_end_date: '',
        lease_update_date: '',
        rent_price: 0,
        rent_payment_date: '',
        rent_payment_period: '',
        penalty_amount: 0,
        penalty_waiting_period: 0,
        lease_image: [],
        deposit_slip_image: [],
        space_id: 0
      };
      const defaultSpace: Space = {
        id:0 ,
        listed_date: '',
        space_images: [],
        cover_image: [],
        building_id: 0,
        space_purpose: '',
        space_id: '',
        size: 0,
        number_of_views: 0,
        floor: 0,
        number_of_rooms: 0,
        price: 0,
        space_status: '',
      };
    
    

    const tenant = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo') || '{}') : null;
    const lease = (useSelector((state: RootState) => state.agreement.agreements).find((lease) => lease.id === tenant.lease_id)) || defaultLease;
    const listing = useSelector((state: RootState) => state.listing.listings).find((listing) => listing.id === lease.space_id) || defaultSpace;

    const all_payments =  useSelector((state: RootState) => state.payment.payments) || defaultPayment;
    const [currentStatus, setCurrentStatus] = useState<string>('');
    const statDropDownOptions = ['Open for rent', 'Closed'];
    const userType = 'tenant';

    const buttonOptions = [
        { label: 'Reminders', primary: true },
        { label: 'Payments' },
        { label: 'Document' },
        { label: 'Maintenance' },
        { label: 'Special Features' },
    ];

    useEffect(()=>{
        dispatch(getAllAgreements());
        dispatch(getAllListings());
        dispatch(getPaymentByTenant(tenant.id));
    },[dispatch]);

    useEffect(() => {
        dispatch(getTotalPaymentBySpace(listing.id));
    },[dispatch,listing]);
   
    const handleSelectedStatus = (status: string) => {
        setCurrentStatus(status);
    }

    
  

    const [selectedOption, setSelectedOption] = useState(buttonOptions[0].label);

    const renderContent = () => {
        switch (selectedOption) {
            case 'Reminders':
                return <Reminders/>;
            case 'Document':
                return <Agreement isClosed={true} agreement={lease}  />;  
            case 'Payments':
                return <Payment userType = {userType} totalPayment={0} all_payments={all_payments} />;
            case 'Maintenance':
                return listing ? <Maintenance spaceId={listing.id} /> : <div>Listing not found</div>;
            case 'Special Features':
                    return <ListingFeatures spaceId={0}/>;
            default:
                return <div></div>;
        }
    };

    return (
        <LandlordLayout>
            <div className="flex flex-col lg:flex-row items-center justify-between p-3 my-4 overflow-auto">
                <div className="flex flex-col items-start justify-between gap-2">
                    <h1 className="text-xl lg:text-2xl font-semibold text-secondary-dark">{listing.space_purpose} {listing.space_id}</h1>
                    <span className="text-sm lg:text-base text-gray-500 font-light">Rented space view</span>
                </div>
            
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col items-center p-4 w-full lg:w-2/5 bg-white">
                    <ImageSlider images={[image1, image2, image3, image1]} />

                    <div className="flex-1 w-full">
                        <div className="flex items-center justify-between px-3 my-4">
                            <p className="text-lg lg:text-xl font-semibold text-primary-dark">{listing?.space_purpose}</p>
                            <p className="text-secondary-light">{listing.number_of_views} views</p>
                        </div>

                        <div className="px-4 space-y-2">
                            <hr className="my-4" />
                            <p className="text-gray-500">Area: {listing.size} sq ft.</p>
                            <p className="text-gray-500">Floor: {listing.floor} floor</p>
                            <p className="text-gray-500"> </p>
                            <p className="text-gray-500">Number of rooms: 2</p>
                            <p className="text-gray-500">Price: {listing.price} ETB</p>
                             <div className="py-4">
                                <button className='text-secondary-light font-bold'>View More</button>
                            </div> 
                        </div>
                       
                    </div>
                    <div className="mt-4">
                            <button className="w-full py-2 px-4 bg-primary-dark hover:bg-secondary-dark text-white rounded-md">
                                <FontAwesomeIcon icon={faPhone} className='text-white mr-2' />
                                Contact Landlord</button>
                    </div>
                </div>

                <div className="flex flex-col w-full">
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

export default MyRent;
