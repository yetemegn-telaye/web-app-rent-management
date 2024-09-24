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



const ListingDetail: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const space = useSelector((state: RootState) => state.listing.listing);
    const { id } = useParams<{ id: string }>(); 
    const listingId = id ? parseInt(id) : undefined;
    const listing = id ? listings.find((listing) => listing.id === listingId) : undefined;
    const [currentStatus, setCurrentStatus] = useState<string>('');
    const statDropDownOptions = ['open_for_rent', 'occupied','closed'];

    const buttonOptions = [
        { label: 'Document',primary: true  },
        { label: 'Features'},
    ];

    useEffect(()=>{
        if (listingId !== undefined) {
            dispatch(getListingById(listingId))
            .then(() => {
                console.log(' listing',space);
             })
             .catch((error) => {
                 alert(error);
             });
        }
       
    
       },[dispatch,listings]);
   
    const handleSelectedStatus = (status: string) => {
        setCurrentStatus(status);
    }

    
    if (listing?.space_status.toLowerCase() === 'occupied') {
        buttonOptions.unshift({ label: 'Maintenance' });
        buttonOptions.unshift({ label: 'Payments' });
       
    }

    const [selectedOption, setSelectedOption] = useState(buttonOptions[0].label);

    const renderContent = () => {
        switch (selectedOption) {
            case 'Features':
                return listingId !== undefined ? <ListingFeatures spaceId={listingId} /> : <div>No Listing ID</div>;
            case 'Document':
                return <Agreement isClosed={listing?.space_status.toLowerCase() === 'occupied'} />; 
            case 'Payments':
                return <Payment userType='landlord'/>;
         
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
                    <h1 className="text-xl lg:text-2xl font-semibold text-secondary-dark">{listing?.space_purpose.toUpperCase()} Space</h1>
                    <span className="text-sm lg:text-base text-gray-500 font-light">Listing detail page for ID: {id}</span>
                </div>
                <div className="space-x-4 mt-4 lg:mt-0">
                   
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
                            <p className="text-lg lg:text-xl font-semibold text-primary-dark">{listing?.space_purpose}</p>
                            <p className="text-secondary-light">{listing?.num_of_views} views</p>
                        </div>

                        <div className="px-4 space-y-2">
                            <hr className="my-4" />
                            <p className="text-gray-500">Area: {listing?.size} sq ft.</p>
                            <p className="text-gray-500">Floor: {listing?.on_floor} floor</p>
                            <p className="text-gray-500">Furnished: No</p>
                            <p className="text-gray-500">Number of rooms: 2</p>
                            <p className="text-gray-500">Price: {listing?.price} ETB</p>
                            <div className="py-4">
                                <label className="text-sm font-semibold text-gray-700">Current Status</label>
                                <Dropdown label={listing!.space_status} options={statDropDownOptions} onSelect={handleSelectedStatus} />
                            </div>
                        </div>
                        {listing?.space_status.toLowerCase() === 'occupied' && (
                            <div className="mt-4 text-center">
                                <button className=" py-2 px-4 bg-primary-dark hover:bg-secondary-dark text-white rounded-md">
                                    <FontAwesomeIcon icon={faUserAlt} className='mr-3'/>
                                    Contact Tenant</button>
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
