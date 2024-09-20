import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LandlordLayout from "../../layout/LandlordLayout";
import { faEdit, faFilter, faUser, faTimes, faAdd } from "@fortawesome/free-solid-svg-icons";
import ListingCard from "../../components/ListingCard";
import image1 from '../../assets/images/office1.webp';
import image2 from '../../assets/images/office2.jpg';
import image3 from '../../assets/images/office3.jpg';
import FilterSection from "../../components/FilterSection";
import Dropdown from "../../components/Dropdown";
import { Link } from "react-router-dom";

interface Listing {
    id: string;
    spaceId: string;
    title: string;
    floor: number;
    area: number;
    priceRange: string;
    status: 'Open for rent' | 'Closed';
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
        status: 'Open for rent',
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
        status: 'Open for rent',
        views: 42,
        imageUrl: image2,
    },
];

const Listings: React.FC = () => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const dropDownOptions = ['All', 'Available', 'Rented'];
    const [selectedTypeOption, setSelectedTypeOption] = useState('All');

    const handleSelectedTypeOption = (selectedTypeOption: string) => {
        setSelectedTypeOption(selectedTypeOption);
    }
    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    return (
        <LandlordLayout>
            <div className='flex items-center justify-between border-red-300 p-3 my-8 overflow-auto'>
                <div className='flex flex-col items-start justify-between gap-2'>
                    <h1 className="text-2xl font-semibold text-secondary-dark">All Listings</h1>
                    <span className='text-sm text-gray-500 font-light'>View all listings</span>
                </div>
                <div className="flex">
                    <input type="text" placeholder="Search" className="border border-gray-300 p-2 rounded-lg" />
              
                    <button type="button" className="bg-primary-dark text-white font-light p-2 rounded-lg ml-2">
                        <Link to="/add-listing">
                        <FontAwesomeIcon icon={faAdd} className="mr-2" />
                        Add Listing
                        </Link>
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-4 w-1/3 my-8">
            <button
                        type="button"
                        className="bg-primary-dark bg-opacity-15 text-secondary-dark p-2 rounded-lg ml-2 flex items-center"
                        onClick={toggleFilter}
                    >
                        <FontAwesomeIcon icon={isFilterVisible ? faTimes : faFilter}  className="mr-2"/>
                        {isFilterVisible ? ' Close Filters' : ' Filter'}
                    </button>
            <Dropdown label="All" options={dropDownOptions} onSelect={handleSelectedTypeOption}/>
            </div>
            {isFilterVisible && <FilterSection />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                    <ListingCard key={listing.id} {...listing} />
                ))}
            </div>
            
        </LandlordLayout>
    );
};

export default Listings;
