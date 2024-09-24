import React from 'react';
import { Stepper, Step } from 'react-form-stepper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface StepperProps {
  buttonOptions: { label: string; primary?: boolean }[];
  selectedOption: string;
  onOptionSelected: (label: string) => void;
  activeStep: number; 
}

const FormStepper: React.FC<StepperProps> = ({ buttonOptions, selectedOption, onOptionSelected, activeStep }) => {

  const handleStepChange = (stepIndex: number) => {
    if (stepIndex > activeStep) {
        onOptionSelected(buttonOptions[stepIndex].label); 
      }
  };

  return (
    <div className="w-full ml-0 pl-0 my-8">
      <Stepper
        activeStep={activeStep}
        styleConfig={{
          activeBgColor: '#E6822E', 
          activeTextColor: '#ffffff', 
          completedBgColor: '#076D6D', 
          completedTextColor: '#ffffff', 
          inactiveBgColor: '#d1d5db', 
          inactiveTextColor: '#6b7280', 
          circleFontSize: '1rem', 
          labelFontSize: '0.875rem', 
          size: '2em', 
          circleFontColor: '#000000', 
          borderRadius: '50%',
          fontWeight: 500, 
        }}
      >
        {buttonOptions.map((option, index) => (
          <Step
            label={index < activeStep ? '' : option.label} 
            key={index}
            onClick={() => handleStepChange(index)} 
          >
            {index < activeStep && (

              <FontAwesomeIcon icon={faCheck} className="text-white" /> 
              
            )}
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default FormStepper;
