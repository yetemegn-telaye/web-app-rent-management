import { useEffect, useState } from "react";
import LandlordLayout from "../../layout/LandlordLayout";
import BasicDetailForm from "./BasicDetailForm";
import SpecialFeatureForm from "./SpecialFeatureForm";
import StepperComponent from "../../components/FormStepper";
import FormStepper from "../../components/FormStepper";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AddListing: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.managerUser);
  const buttonOptions = [
    { label: 'Basic Detail', primary: true },
    { label: 'Special Features' },
  ];


    useEffect(()=>{
       console.log('user',user);
    }
    ,[]);
    
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
      <div className="px-2 md:px-4">
  <div className='flex flex-col md:flex-row items-center justify-between border-red-300 my-12'>
    <div className='flex flex-col items-start gap-2'>
      <h1 className="text-xl md:text-2xl font-semibold text-secondary-dark">Add Listings</h1>
      <span className='text-sm text-gray-500 font-light'>Add new listing</span>
    </div>
  </div>

  <FormStepper
    buttonOptions={buttonOptions}
    selectedOption={selectedOption}
    onOptionSelected={(label) => handleNextStep(label)}
    activeStep={currentStep}
  />

  <div className="flex flex-col h-auto md:h-screen overflow-auto">
    {renderContent()}
  </div>
</div>

    </LandlordLayout>
  );
};

export default AddListing;
