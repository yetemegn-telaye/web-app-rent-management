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
    <div className="flex items-center justify-end space-x-4 p-4 bg-primary mb-6">
      <div className="flex items-center bg-white px-4 py-2 rounded-md">
        <FontAwesomeIcon icon={faSearch} className="text-gray-600 mr-2" />
        <input
          type="text"
          placeholder="Type to search..."
          className="bg-transparent focus:outline-none text-gray-600"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {filters.map((filter) => (
        <button
          key={filter}
          className="flex items-center bg-white px-4 py-2 rounded-md text-gray-600 hover:bg-gray-200"
          onClick={() => onFilterClick(filter.toLowerCase())}
        >
          <FontAwesomeIcon icon={faSlidersH} className="mr-2" />
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterPayment;
