import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LandlordLayout from "../../layout/LandlordLayout";
import { faEdit, faFilter, faUser, faTimes, faAdd } from "@fortawesome/free-solid-svg-icons";
import ListingCard from "./ListingCard";
import image1 from '../../assets/images/office1.webp';
import image2 from '../../assets/images/office2.jpg';
import image3 from '../../assets/images/office3.jpg';
import FilterSection from "../../components/FilterSection";
import Dropdown from "../../components/Dropdown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { getAllListings } from "./listingSlice";
import { error } from "console";
import { Space } from "../../types/space";



export const listings: Space[] = [
    {
        id: 1,
        space_id: 'off01',
        size: 233,
        space_images: [image1, image2, image2],
        cover_image: [image1],
        floor: 2,
        space_purpose: 'office',
        price: 30000,
        number_of_rooms: 2,
        space_status: 'Occupied',
        number_of_views: 34,
        building_id: 2,
        listed_date: ""
    }
];

const Listings: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const allListings = useSelector((state:RootState)=>state.listing.listings);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const dropDownOptions = ['All', 'Available', 'Rented'];
    const [selectedTypeOption, setSelectedTypeOption] = useState('All');

   useEffect(()=>{
    dispatch(getAllListings());
   },[]);

    const handleSelectedTypeOption = (selectedTypeOption: string) => {
        setSelectedTypeOption(selectedTypeOption);
    }
    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    return (
        <LandlordLayout>
           <div className='flex flex-col md:flex-row items-center justify-between border-red-300 p-3 my-8'>
    <div className='flex flex-col items-start justify-between gap-2'>
        <h1 className="text-2xl font-semibold text-secondary-dark">All Listings</h1>
        <span className='text-sm text-gray-500 font-light'>View all listings</span>
    </div>
    <div className="flex flex-col sm:my-4 items-center gap-2">
        <input type="text" placeholder="Search" className="border border-gray-300 p-2 rounded-lg w-full sm:w-auto" />
        <button type="button" className="bg-primary-dark text-white font-light p-2 rounded-lg flex items-center">
            <Link to="/add-listing">
                <FontAwesomeIcon icon={faAdd} className="mr-2" />
                Add Listing
            </Link>
        </button>
    </div>
</div>

<div className="flex flex-col md:flex-row items-center gap-4 my-8 w-full md:w-1/3">
    <button
        type="button"
        className="bg-primary-dark bg-opacity-15 text-secondary-dark p-2 rounded-lg flex items-center w-full md:w-auto"
        onClick={toggleFilter}
    >
        <FontAwesomeIcon icon={isFilterVisible ? faTimes : faFilter} className="mr-2"/>
        {isFilterVisible ? ' Close Filters' : ' Filter'}
    </button>
    <Dropdown label="All" options={dropDownOptions} onSelect={handleSelectedTypeOption} />
</div>

{isFilterVisible && <FilterSection />}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
    ))} */}
    {allListings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
    ))}
</div>

            
        </LandlordLayout>
    );
};

export default Listings;
