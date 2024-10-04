import React from 'react';

interface OptionsSectionProps {
  buttonOptions: { label: string; primary?: boolean }[];
  selectedOption: string; // Pass the selected option from parent
  onOptionSelected: (label: string) => void;
}

const OptionsSection: React.FC<OptionsSectionProps> = ({ buttonOptions, selectedOption, onOptionSelected }) => {
  return (
    <div className="flex flex-wrap justify-start items-center mb-7">
    {buttonOptions.map((option, index) => (
        <button
            key={index}
            onClick={() => onOptionSelected(option.label)}
            className={`py-2 px-4 flex items-center justify-center focus:outline-none ${
                selectedOption === option.label ? 'bg-primary-dark text-white' : 'bg-white text-secondary-dark border border-gray-300'
            }`}
        >
            {option.label}
        </button>
    ))}
</div>

  );
};

export default OptionsSection;
