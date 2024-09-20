import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';


interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options,onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative w-full">
      <button
        className={`w-full bg-white border ${
          isOpen ? 'border-primary-dark' : 'border-gray-300'
        } text-gray-400 py-2 px-4 flex items-center justify-between focus:outline-none rounded-md`}
        onClick={toggleDropdown}
      >
        <span>{selectedOption ? selectedOption : label}</span>
        <FontAwesomeIcon icon={faChevronDown}/>
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                selectedOption === option ? 'bg-primary-light' : ''
              }`}
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
