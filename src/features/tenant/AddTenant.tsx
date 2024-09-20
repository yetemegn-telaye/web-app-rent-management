import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LandlordLayout from "../../layout/LandlordLayout";
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import OptionsSection from "../../components/OptionsSection";
import { useState } from "react";
import AgreementForm from "./AgreementForm";
import TenantProfileForm from "./TenantForm";
import CurrentStateForm from "./currentStateForm";
import StepperComponent from "../../components/FormStepper";
import FormStepper from "../../components/FormStepper";


const AddTenant: React.FC = ()=>{
    const buttonOptions = [
        { label: 'Agreement Info' },
        { label: 'Tenant Info' },
        { label: 'Current State of Listing' },
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
            case 'Agreement Info':
                return <AgreementForm setSelectedOption={() => handleNextStep('Tenant Info')}/>;
            case 'Tenant Info':
                return <TenantProfileForm setSelectedOption={() => handleNextStep('Current State of Listing')}/>;
            case 'Current State of Listing':
                return <CurrentStateForm/>;
            default:
                return <div></div>;
        }
    };


    return(
       <LandlordLayout>
             <div className="flex flex-col lg:flex-row items-center justify-between my-8 px-4 ">
                <div className="flex flex-col items-start justify-between gap-2">
                    <h1 className="text-xl lg:text-2xl font-semibold text-secondary-dark">
    
                        Add Tenant</h1>
                    <span className="text-sm lg:text-base text-gray-500 font-light">Add a new Tenant</span>
                </div>
            
            </div>
            
        
                <FormStepper
          buttonOptions={buttonOptions}
          selectedOption={selectedOption}
          onOptionSelected={(label) => handleNextStep(label)}
          activeStep={currentStep}
        />

            <div className="flex flex-col mt-10 h-full relative">
                        {renderContent()}
            </div>
       </LandlordLayout>
    );
}
export default AddTenant;