import React from 'react';

interface Listing {
  id: string;
  title: string;
  floor: number;
  area: number;
  priceRange: string;
  status: 'Open for rent' | 'Closed';
  views: number;
  imageUrl: string;
}

const ListingCard: React.FC<Listing> = ({
  title,
  floor,
  area,
  priceRange,
  status,
  views,
  imageUrl,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md border border-blue-300" />
        <div
          className={`absolute top-2 right-2 bg-white text-xs font-semibold py-1 px-2 rounded ${
            status === 'Closed' ? 'text-red-500' : 'text-teal-500'
          }`}
        >
          {status}
        </div>
      </div>
      <div className="mt-4">
        <div className='flex justify-between mt-2 text-gray-500 text-sm'>
        <h3 className="font-bold text-secondary-dark text-lg">
          {title}
        </h3>
        <span className="text-secondary-light">{views} views</span>
        </div>
        <hr className='my-4'/>
        <div className="flex justify-between mt-2 text-gray-500 text-sm">
          <span>FLOOR: {floor}nd</span>
          <span>Area: {area} sq ft</span>
        </div>
        <div className="flex justify-between mt-2 text-gray-700 text-sm">
          <span>Price: {priceRange} ETB</span>
         
        </div>
      </div>
      <div className="mt-4">
        <button className="w-full bg-primary-dark hover:bg-secondary-dark text-white text-sm py-2 rounded-lg">View</button>
      </div>
    </div>
  );
};

export default ListingCard;
