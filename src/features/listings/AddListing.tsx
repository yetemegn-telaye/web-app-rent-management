import { useState } from "react";
import LandlordLayout from "../../layout/LandlordLayout";
import BasicDetailForm from "./BasicDetailForm";
import SpecialFeatureForm from "./SpecialFeatureForm";
import StepperComponent from "../../components/FormStepper";
import FormStepper from "../../components/FormStepper";

const AddListing: React.FC = () => {
  const buttonOptions = [
    { label: 'Basic Detail', primary: true },
    { label: 'Special Features' },
  ];

  const [selectedOption, setSelectedOption] = useState(buttonOptions[0].label);
  const [currentStep, setCurrentStep] = useState(0); 


  const handleNextStep = (nextOption: string) => {
    setSelectedOption(nextOption); 
    const nextStepIndex = buttonOptions.findIndex((option) => option.label === nextOption);
    setCurrentStep(nextStepIndex); 
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'Basic Detail':
        return <BasicDetailForm setSelectedOption={() => handleNextStep('Special Features')} />;
      case 'Special Features':
        return <SpecialFeatureForm  />;
      default:
        return <div></div>;
    }
  };

  return (
    <LandlordLayout>
      <div className="px-2">
        <div className='flex items-center justify-between border-red-300 my-12 overflow-auto'>
          <div className='flex flex-col items-start justify-between gap-2'>
            <h1 className="text-2xl font-semibold text-secondary-dark">Add Listings</h1>
            <span className='text-sm text-gray-500 font-light'>Add new listing</span>
          </div>
        </div>

        <FormStepper
          buttonOptions={buttonOptions}
          selectedOption={selectedOption}
          onOptionSelected={(label) => handleNextStep(label)}
          activeStep={currentStep} 
        />

        <div className="flex flex-col h-100vh relative">
          {renderContent()}
        </div>
      </div>
    </LandlordLayout>
  );
};

export default AddListing;
