import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { Space } from '../../types/space';

interface ListingCardProps {
  listing: Space;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  // Fallback for cover image if undefined or empty
  const coverImage = Array.isArray(listing.cover_image) && listing.cover_image.length > 0
    ? listing.cover_image[0]
    : 'https://via.placeholder.com/400'; // Placeholder image URL for missing images

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4">
      <div className="relative">
        <img
          src={coverImage}
          alt={listing.space_purpose || 'Listing Image'}
          className="w-full h-48 object-cover rounded-md"
        />
        <div
          className={`absolute top-2 right-2 bg-white text-xs font-semibold py-1 px-2 rounded ${
            listing.space_status.toLowerCase() === 'closed'
              ? 'text-red-600'
              : listing.space_status.toLowerCase() === 'occupied'
              ? 'text-secondary-light'
              : 'text-teal-600 animate-pulse'
          }`}
        >
          {listing.space_status}
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between mt-2 text-gray-500 text-sm">
          <h3 className="font-medium text-secondary-dark text-lg">
            {listing.space_purpose || 'No Purpose'}
          </h3>
          <span className="text-secondary-light">
            {listing.number_of_views || 0} <FontAwesomeIcon icon={faEye} />
          </span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between items-center mt-2 text-gray-700 text-sm">
          <div className="flex flex-col justify-between mt-2 text-gray-500 text-sm">
            <span>FLOOR: {listing.floor || 'N/A'}nd</span>
            <span>Area: {listing.size || 0} sq ft</span>
          </div>

          <span className="font-bold">Price: {listing.price || 0} ETB</span>
        </div>
      </div>
      <div className="mt-2 text-end">
        <Link to={`/listing-detail/${listing.id}`}>
          <button className="px-4 text-center bg-primary-dark hover:bg-secondary-dark text-white text-sm py-2 rounded-lg">
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
