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
        pictures: [image1, image2, image2],
        coverImage: image1,
        on_floor: 2,
        space_purpose: 'office',
        price: 30000,
        number_of_rooms: 2,
        space_status: 'Occupied',
        num_of_views: 34,
        space_feature_id: 1,
        listed_date: ""
    },
    {
        id: 2,
        space_id: 'off01',
        size: 233,
        pictures: [image1, image2, image2],
        coverImage: image1,
        on_floor: 2,
        space_purpose: 'office',
        price: 30000,
        number_of_rooms: 2,
        space_status: 'Occupied',
        num_of_views: 34,
        space_feature_id: 1,
        listed_date: ""
    },
    {
        id: 3,
        space_id: 'off01',
        size: 233,
        pictures: [image1, image2, image2],
        coverImage: image1,
        on_floor: 2,
        space_purpose: 'office',
        price: 30000,
        number_of_rooms: 2,
        space_status: 'Occupied',
        num_of_views: 34,
        space_feature_id: 1,
        listed_date: ""
    },
    {
        id: 4,
        space_id: 'off01',
        size: 233,
        pictures: [image1, image2, image2],
        coverImage: image1,
        on_floor: 2,
        space_purpose: 'office',
        price: 30000,
        number_of_rooms: 2,
        space_status: 'Occupied',
        num_of_views: 34,
        space_feature_id: 1,
        listed_date: ""
    },
    {
        id: 5,
        space_id: 'off01',
        size: 233,
        pictures: [image1,image2,image2],
        coverImage: image1,
        on_floor: 2,
        space_purpose: 'office',
        price: 30000,
        number_of_rooms: 2,
        space_status: 'Occupied',
        num_of_views: 34,
        space_feature_id: 1,
        listed_date:''
    },
    {
        id: 6,
        space_id: 'off01',
        size: 233,
        pictures: [image1,image2,image2],
        coverImage: image1,
        on_floor: 2,
        space_purpose: 'office',
        price: 30000,
        number_of_rooms: 2,
        space_status: 'Occupied',
        num_of_views: 34,
        space_feature_id: 1,
        listed_date:''
    },
];

const Listings: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const allListings = useSelector((state:RootState)=>state.listing.listings);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const dropDownOptions = ['All', 'Available', 'Rented'];
    const [selectedTypeOption, setSelectedTypeOption] = useState('All');

   useEffect(()=>{
    dispatch(getAllListings())
    .then(() => {
       console.log('all listings',allListings);
    })
    .catch((error) => {
        alert(error);
    });

   },[dispatch,listings]);

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
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
            
        </LandlordLayout>
    );
};

export default Listings;
