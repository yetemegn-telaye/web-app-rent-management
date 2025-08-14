import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LandlordLayout from "../../layout/LandlordLayout";
import { faEdit, faFilter, faUser, faTimes, faAdd } from "@fortawesome/free-solid-svg-icons";
import ListingCard from "./ListingCard";
import FilterSection from "../../components/FilterSection";
import Dropdown from "../../components/Dropdown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { getAllListings } from "./listingSlice";
import { Space } from "../../types/space";


const Listings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allListings = useSelector((state: RootState) => state.listing.listings) || [];
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const dropDownOptions = ['All', 'Available', 'Rented'];
  const [selectedTypeOption, setSelectedTypeOption] = useState('All');

  // Range states
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 1000]);
  const [floorRange, setFloorRange] = useState<[number, number]>([0, 10]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedListingType, setSelectedListingType] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllListings());
  }, [dispatch]);

  const toggleFilter = () => setIsFilterVisible(!isFilterVisible);

  // Filtered & sorted listings
  const sortedListings = allListings
    .filter((listing) => listing.listed_date)
    .filter((listing) =>
      selectedTypeOption === 'All' ? true : listing.space_status === selectedTypeOption
    )
    .filter((listing) => listing.size >= areaRange[0] && listing.size <= areaRange[1])
    .filter((listing) => listing.floor >= floorRange[0] && listing.floor <= floorRange[1])
    .filter(
      (listing) =>
        !selectedListingType || selectedListingType === 'none' || listing.space_purpose === selectedListingType
    )
    .filter((listing) => listing.price >= priceRange[0] && listing.price <= priceRange[1])
    .sort((a, b) => new Date(b.listed_date).getTime() - new Date(a.listed_date).getTime());

  return (
    <LandlordLayout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between border-red-300 p-3 my-8">
        <div className="flex flex-col items-start justify-between gap-2">
          <h1 className="text-2xl font-semibold text-secondary-dark">All Listings</h1>
          <span className="text-sm text-gray-500 font-light">View all listings</span>
        </div>
        <div className="flex flex-col sm:my-4 items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 p-2 rounded-lg w-full sm:w-auto"
          />
          <button
            type="button"
            className="bg-primary-dark text-white font-light p-2 rounded-lg flex items-center"
          >
            <Link to="/add-listing">
              <FontAwesomeIcon icon={faAdd} className="mr-2" />
              Add Listing
            </Link>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 my-8 w-full md:w-1/3">
        <button
          type="button"
          className="bg-primary-dark bg-opacity-15 text-secondary-dark p-2 rounded-lg flex items-center w-full md:w-auto"
          onClick={toggleFilter}
        >
          <FontAwesomeIcon icon={isFilterVisible ? faTimes : faFilter} className="mr-2" />
          {isFilterVisible ? ' Close Filters' : ' Filter'}
        </button>
        <Dropdown label="All" options={dropDownOptions} onSelect={setSelectedTypeOption} />
      </div>

      {isFilterVisible && (
        <FilterSection
          areaRange={areaRange}
          setAreaRange={setAreaRange}
          floorRange={floorRange}
          setFloorRange={setFloorRange}
          selectedType={selectedListingType}
          setSelectedType={setSelectedListingType}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
      )}

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedListings.length > 0 ? (
          sortedListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-danger">No listings found</p>
          </div>
        )}
      </div>
    </LandlordLayout>
  );
};

export default Listings;
