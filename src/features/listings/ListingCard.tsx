import { faEye, faEyeDropper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

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

const ListingCard: React.FC<Listing> = ({
  id,
  spaceId,
  title,
  floor,
  area,
  priceRange,
  status,
  views,
  imageUrl,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md " />
        <div
          className={`absolute top-2 right-2 bg-white text-xs font-semibold py-1 px-2 rounded ${
            status === 'Closed' ? 'text-red-600' : status==='Occupied'? 'text-secondary-light' :'text-teal-600 animate-pulse'
          }`}
        >
          {status}
        </div>
      </div>
      <div className="mt-2">
        <div className='flex justify-between mt-2 text-gray-500 text-sm'>
          <h3 className="font-medium text-secondary-dark text-lg">
            {title}
          </h3>
          <span className="text-secondary-light">{views} <FontAwesomeIcon icon={faEye}/></span>
        </div>
        <hr className='my-2'/>
        <div className="flex justify-between items-center mt-2 text-gray-700 text-sm">
        <div className="flex flex-col justify-between mt-2 text-gray-500 text-sm">
          <span>FLOOR: {floor}nd</span>
          <span>Area: {area} sq ft</span>
        </div>
        
          <span className='font-bold'>Price: {priceRange} ETB</span>
        </div>
      </div>
      <div className="mt-2 text-end">
        <Link to={`/listing-detail/${id}`}>
          <button className="px-4 text-center bg-primary-dark hover:bg-secondary-dark text-white text-sm py-2 rounded-lg">
           View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
