import React, { useEffect, useState } from 'react';
import LandlordLayout from '../../layout/LandlordLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMapPin } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../../components/Calendar';
import OptionsSection from '../../components/OptionsSection';
import SetOpenDate from './SetOpenDate';
import ManagerProfile from './ManagerProfile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getBuildingById } from './buildingSlice';

const Property: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const buildingInfo = useSelector((state:RootState)=>state.building.building) || [{}];
    const buttonOptions = [
        { label: 'Set Open House Date' },
        { label: 'View Manager' },
        { label: 'Document' },
    ];

    const [selectedOption, setSelectedOption] = useState(buttonOptions[0].label);


    useEffect(()=>{
        dispatch(getBuildingById(2));
    });

    const renderContent = () => {
        switch (selectedOption) {
            case 'Set Open House Date':
                return <SetOpenDate />;
            case 'View Manager':
                return <ManagerProfile/>;
            case 'Document':
                return <p>sd</p>;
            default:
                return <div>df</div>;
        }
    };


    return (
        <LandlordLayout>
            <div className='flex items-center justify-between p-3 my-4 overflow-auto'>
                <div className='flex flex-col items-start justify-between gap-2'>
                    <h1 className="text-2xl font-semibold text-secondary-dark">Ambassador Mall</h1>
                    <span className='text-sm text-gray-500 font-light'>Property Detail</span>
                </div>
                <button className='bg-primary-dark px-4 py-1 font-light text-white rounded-md'>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col items-center p-4 w-2/5 bg-white">
                    <div className="flex w-full justify-between">
                        <img
                            className="w-3/4 h-72 object-cover rounded-lg"
                            src="https://via.placeholder.com/150"
                            alt="Property"
                        />
                        <div className="flex flex-col w-1/4 px-2 items-center gap-3 justify-start">
                            <img
                                className="w-full h-16 object-cover rounded-lg"
                                src="https://via.placeholder.com/150"
                                alt="Thumbnail"
                            />
                            <img
                                className="w-full h-16 object-cover rounded-lg"
                                src="https://via.placeholder.com/150"
                                alt="Thumbnail"
                            />
                            <img
                                className="w-full h-16 object-cover rounded-lg"
                                src="https://via.placeholder.com/150"
                                alt="Thumbnail"
                            />
                            <img
                                className="w-full h-16 object-cover rounded-lg"
                                src="https://via.placeholder.com/150"
                                alt="Thumbnail"
                            />
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="flex-1 w-full">
                        <div className='flex items-center justify-center gap-2 my-4'>
                            <FontAwesomeIcon icon={faMapPin} className="text-primary-dark" />
                            <h3 className="text-xl font-semibold text-primary-dark">4 KILO</h3>
                        </div>

                        <div className='px-4 space-y-2'>
                            <hr className='my-4' />
                            <p className="text-gray-500">Total Spaces: {buildingInfo.total_spaces}</p>
                            <p className="text-gray-500">Available Spaces: {buildingInfo.available_spaces}</p>
                            <p className="text-gray-500">Area: {buildingInfo.total_size} Sq ft.</p>
                            <p className="text-gray-500">Floors: 8 Floors</p>
                            <p className="text-gray-500">Total Parking Spaces: {buildingInfo.total_parking_space} parking spaces</p>
                            <div className="mt-8">
                                <label className="text-sm font-semibold text-gray-700">Current Manager</label>
                                <input
                                    type="text"
                                    value="Abebe Daniel"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <button className="w-full py-2 px-4 bg-primary-dark hover:bg-secondary-dark text-white rounded-md">View Report</button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col w-full'>
                    <OptionsSection
                        buttonOptions={buttonOptions}
                        selectedOption={selectedOption}
                        onOptionSelected={(label) => setSelectedOption(label)}
                    />
              
              <div className="flex flex-col w-full h-full items-center justify-center relative">
                        {renderContent()}
                    </div>
                </div>
            </div>

         
        </LandlordLayout>
    );
};

export default Property;
