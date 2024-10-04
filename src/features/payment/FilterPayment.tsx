import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';

interface FilterPaymentProps {
  onSearchChange: (searchTerm: string) => void;
  onFilterClick: (filter: string) => void;
}

const FilterPayment: React.FC<FilterPaymentProps> = ({ onSearchChange, onFilterClick }) => {
  const filters = ['Upcoming', 'Date', 'Delayed', 'Paid'];

  return (
    <div className="flex flex-wrap items-center justify-end space-x-2 p-4 bg-primary mb-6">
    <div className="flex items-center bg-white px-2 py-1 rounded-md grow md:grow-0">
        <FontAwesomeIcon icon={faSearch} className="text-gray-600 mr-1" />
        <input
            type="text"
            placeholder="Type to search..."
            className="bg-transparent focus:outline-none text-gray-600 w-full"
            onChange={(e) => onSearchChange(e.target.value)}
        />
    </div>
    <div className="flex flex-wrap items-center space-x-2">
        {filters.map((filter) => (
            <button
                key={filter}
                className="flex items-center bg-white px-2 py-1 rounded-md text-gray-600 hover:bg-gray-200 text-sm md:text-base"
                onClick={() => onFilterClick(filter.toLowerCase())}
            >
                <FontAwesomeIcon icon={faSlidersH} className="mr-1 md:mr-2" />
                {filter}
            </button>
        ))}
    </div>
</div>

  );
};

export default FilterPayment;
