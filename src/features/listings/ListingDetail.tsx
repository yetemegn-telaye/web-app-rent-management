import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LandlordLayout from '../../layout/LandlordLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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

interface Listing {
    id: string;
    spaceId: string;
    title: string;
    floor: number;
    area: number;
    priceRange: string;
    status: 'Open for rent' | 'Closed'| 'Occupied';
    views: number;
    imageUrl: string;
}


const listings: Listing[] = [
    {
        id: '1',
        spaceId: 'OFF001',
        title: 'Office(OFF001)',
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
        title: 'Commercial(CM001)',
        floor: 2,
        area: 50,
        priceRange: '25,000 - 33,000',
        status: 'Occupied',
        views: 12,
        imageUrl: image2,
    },
    {
        id: '3',
        spaceId: 'OFF002',
        title: 'Office(OFF002)',
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
        title: 'Commercial(CM002)',
        floor: 1,
        area: 50,
        priceRange: '25,000 - 33,000',
        status: 'Open for rent',
        views: 42,
        imageUrl: image2,
    },
    {
        id: '5',
        spaceId: 'CM002',
        title: 'Commercial(CM002)',
        floor: 1,
        area: 50,
        priceRange: '25,000 - 33,000',
        status: 'Open for rent',
        views: 42,
        imageUrl: image2,
    },
    {
        id: '6',
        spaceId: 'CM002',
        title: 'Commercial(CM002)',
        floor: 1,
        area: 50,
        priceRange: '25,000 - 33,000',
        status: 'Occupied',
        views: 42,
        imageUrl: image2,
    },
];

const ListingDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); 
    const listing = listings.find((listing) => listing.id === id);
    const [currentStatus, setCurrentStatus] = useState<string>('');
    const statDropDownOptions = ['Open for rent', 'Occupied','Closed'];

    const buttonOptions = [
        { label: 'Document',primary: true  },
        { label: 'History' },
        { label: 'Features'},
    ];
   
    const handleSelectedStatus = (status: string) => {
        setCurrentStatus(status);
    }

    
    if (listing?.status === 'Occupied') {
        buttonOptions.unshift({ label: 'Maintenance' });
        buttonOptions.unshift({ label: 'Payments' });
       
    }

    const [selectedOption, setSelectedOption] = useState(buttonOptions[0].label);

    const renderContent = () => {
        switch (selectedOption) {
            case 'Features':
                return <ListingFeatures />;
            case 'Document':
                return <Agreement isClosed={listing?.status === 'Occupied'} />;  {/* Pass isClosed prop */}
            case 'Payments':
                return <Payment userType='landlord'/>;
            case 'History':
                return <div>History Content</div>;
            case 'Maintenance':
                return <Maintenance userType='landlord'/>;
            default:
                return <div></div>;
        }
    };

    return (
        <LandlordLayout>
            <div className="flex flex-col lg:flex-row items-center justify-between p-3 my-4 overflow-auto">
                <div className="flex flex-col items-start justify-between gap-2">
                    <h1 className="text-xl lg:text-2xl font-semibold text-secondary-dark">{listing?.title} Space</h1>
                    <span className="text-sm lg:text-base text-gray-500 font-light">Listing detail page for ID: {id}</span>
                </div>
                <div className="space-x-4 mt-4 lg:mt-0">
                    <button className="bg-red-700 px-4 py-1 font-light text-white rounded-md">
                        <FontAwesomeIcon icon={faTrash} /> Remove
                    </button>
                    <button className="bg-primary-dark px-4 py-1 font-light text-white rounded-md">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col items-center p-4 w-full lg:w-2/5 bg-white">
                    <ImageSlider images={[image1, image2, image3, image1]} />

                    <div className="flex-1 w-full">
                        <div className="flex items-center justify-between px-3 my-4">
                            <p className="text-lg lg:text-xl font-semibold text-primary-dark">{listing?.title}</p>
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
                                <label className="text-sm font-semibold text-gray-700">Current Status</label>
                                <Dropdown label={listing!.status} options={statDropDownOptions} onSelect={handleSelectedStatus} />
                            </div>
                        </div>
                        {listing?.status === 'Closed' && (
                            <div className="mt-4">
                                <button className="w-full py-2 px-4 bg-primary-dark hover:bg-secondary-dark text-white rounded-md">View Tenant</button>
                            </div>
                        )}
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

export default ListingDetail;
