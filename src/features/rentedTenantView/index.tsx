import React, { useState } from 'react';
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

interface Listing {
    id: string;
    spaceId: string;
    spaceType: string;
    floor: number;
    area: number;
    priceRange: string;
    status: 'Open for rent' | 'Closed';
    views: number;
    imageUrl: string;
}

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
        phoneNumber: string,
        rentedSpaceId: string
    }

const listings: Listing[] = [
    {
        id: '1',
        spaceId: 'OFF001',
        spaceType: 'Office',
        floor: 2,
        area: 50,
        priceRange: '25,000 - 33,000',
        status: 'Open for rent',
        views: 10,
        imageUrl: image1,
    },
    {
        id: '2',
        spaceId: 'CM001',
        spaceType: 'Office',
        floor: 2,
        area: 50,
        priceRange: '25,000 - 33,000',
        status: 'Open for rent',
        views: 12,
        imageUrl: image2,
    },
    {
        id: '3',
        spaceId: 'OFF002',
        spaceType: 'Office',
        floor: 3,
        area: 100,
        priceRange: '33,000',
        status: 'Closed',
        views: 22,
        imageUrl: image3,
    },
    {
        id: '4',
        spaceId: 'CM002',
        spaceType: 'Commercial',
        floor: 1,
        area: 50,
        priceRange: '25,000 - 33,000',
        status: 'Open for rent',
        views: 42,
        imageUrl: image2,
    },
];

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
    phoneNumber: '+251911092345',
    rentedSpaceId: '1'
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
        phoneNumber: '+251911092345',
        rentedSpaceId: '2'
        },
];

const MyRent: React.FC = () => {
    // const { id } = useParams<{ id: string }>(); 
    const id = '1';
    const tenant = tenants.find((tenant)=> tenant.id === id);
    const listing = listings.find((listing) => listing.id === tenant?.rentedSpaceId);
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
   
    const handleSelectedStatus = (status: string) => {
        setCurrentStatus(status);
    }

    
    if (listing?.status === 'Closed') {
        buttonOptions.push({ label: 'Payments' });
        buttonOptions.push({ label: 'Maintenance' });
    }

    const [selectedOption, setSelectedOption] = useState(buttonOptions[0].label);

    const renderContent = () => {
        switch (selectedOption) {
            case 'Reminders':
                return <Reminders/>;
            case 'Document':
                return <Agreement isClosed={true} />;  {/* Pass isClosed prop */}
            case 'Payments':
                return <Payment userType = {userType}/>;
            case 'Maintenance':
                return <Maintenance userType='tenant' />;
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
                    <h1 className="text-xl lg:text-2xl font-semibold text-secondary-dark">{listing?.spaceType} {listing?.spaceId}</h1>
                    <span className="text-sm lg:text-base text-gray-500 font-light">Rented space view</span>
                </div>
            
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col items-center p-4 w-full lg:w-2/5 bg-white">
                    <ImageSlider images={[image1, image2, image3, image1]} />

                    <div className="flex-1 w-full">
                        <div className="flex items-center justify-between px-3 my-4">
                            <p className="text-lg lg:text-xl font-semibold text-primary-dark">{listing?.spaceType}</p>
                            <p className="text-secondary-light">{listing?.views} views</p>
                        </div>

                        <div className="px-4 space-y-2">
                            <hr className="my-4" />
                            <p className="text-gray-500">Area: {listing?.area} sq ft.</p>
                            <p className="text-gray-500">Floor: {listing?.floor} floor</p>
                            <p className="text-gray-500">Furnished: No</p>
                            <p className="text-gray-500">Number of rooms: 2</p>
                            <p className="text-gray-500">Price: {listing?.priceRange} ETB</p>
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
