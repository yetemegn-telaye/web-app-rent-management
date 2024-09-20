import { useState } from "react";
import LandlordLayout from "../../layout/LandlordLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import OptionsSection from "../../components/OptionsSection";
import BasicDetailForm from "./BasicDetailForm";
import SpecialFeatureForm from "./SpecialFeatureForm";

const AddListing: React.FC = () =>{
    const buttonOptions = [
        { label: 'Basic Detail', primary: true },
        { label: 'Special Features'},
        
    ];
    const [selectedOption, setSelectedOption] = useState(buttonOptions[0].label);

    const renderContent = () => {
        switch (selectedOption) {
            case 'Basic Detail':
                return <BasicDetailForm/>;
            case 'Special Features':
                return <SpecialFeatureForm/>;
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
      
            <OptionsSection 
                        buttonOptions={buttonOptions} 
                        selectedOption={selectedOption} 
                        onOptionSelected={(label) => setSelectedOption(label)} 
                    />
        
            <div className="flex flex-col h-full mt-10 relative">
                        {renderContent()}
            </div>
            </div>
        </LandlordLayout>
    );
}
export default AddListing;