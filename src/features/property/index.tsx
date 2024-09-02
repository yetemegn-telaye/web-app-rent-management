import React, { useState } from 'react';
import LandlordLayout from '../../layout/LandlordLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMapPin } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../../components/Calendar';
import OptionsSection from '../../components/OptionsSection';

const Property: React.FC = () => {
    const [startTime, setStartTime] = useState('14:30');
    const [endTime, setEndTime] = useState('14:30');
    const [repeat, setRepeat] = useState('Monday - Friday');
    const [selectedDate, setSelectedDate] = useState<string | null>(null); 

    const [savedValues, setSavedValues] = useState({
        startTime: '',
        endTime: '',
        repeat: '',
        date: ''
    });
    interface SelectedDate {
        day: number;
        month: number;
        year: number;
        dayName: string;
    }

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(event.target.value);
    };

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(event.target.value);
    };

    const handleRepeatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRepeat(event.target.value);
    };
    const handleDateChange = (selectedDates: SelectedDate[]) => {
        
        console.log('Selected Dates:', selectedDates);
       
        const formattedDates = selectedDates.map(date => 
            `${date.dayName}, ${date.day} - ${new Date(date.year, date.month).toLocaleString('default', { month: 'long' })} - ${date.year}`
        ).join(', ');
    
        console.log('Formatted Dates:', formattedDates);
    };

    const handleSave = () => {
        setSavedValues({
            startTime,
            endTime,
            repeat,
            date: selectedDate || 'No date selected'
        });
        alert('Values saved successfully!');
    };

    return (
        <LandlordLayout>
            <div className='flex items-center justify-between  p-3 my-4 overflow-auto'>
                <div className='flex flex-col items-start justify-between gap-2'>
                    <h1 className="text-2xl font-semibold text-secondary-dark">Ambassador Mall</h1>
                    <span className='text-sm text-gray-500 font-light'>Property Detail</span>
                </div>
                <button className='bg-primary-dark px-4 py-1 font-light text-white rounded-md'>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col items-center p-4 w-2/5 bg-white ">
                    
                    <div className="flex w-full justify-between">
                        <img
                            className="w-3/4 h-72 object-cover rounded-lg"
                            src="https://via.placeholder.com/150"
                            alt="Property"
                        />
                        <div className=" flex flex-col w-1/4 px-2 items-center gap-3 justify-start">
                            <img
                                className="w-full h-16  object-cover rounded-lg"
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
                            <p className="text-gray-500">Total Spaces: 50 spaces</p>
                            <p className="text-gray-500">Available Spaces: 20</p>
                            <p className="text-gray-500">Area: 1000 Sq ft.</p>
                            <p className="text-gray-500">Floors: 8 Floors</p>
                            <p className="text-gray-500">Total Parking Spaces: 30 parking spaces</p>
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
         
                    <OptionsSection/>
              
                <div className="flex flex-col h-4/5 border items-center justify-center bg-white  relative">
                    
                    <div className="mt-4 flex w-full items-center justify-between p-8 gap-8">
                        {repeat === 'Custom' && <Calendar onDateChange={handleDateChange} />}
                        
                        <div className="flex-1 space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-500">Set Time</label>
                                <div className="flex space-x-2">
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={handleStartTimeChange}
                                        className="p-2 border border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={handleEndTimeChange}
                                        className="p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-500">Repeat</label>
                                <select
                                    value={repeat}
                                    onChange={handleRepeatChange}
                                    className="p-2 border border-gray-300 rounded-md w-full"
                                >
                                    <option>Monday - Friday</option>
                                    <option>Weekends</option>
                                    <option>Custom</option>
                                </select>
                            </div>
                            <div className="mt-8 w-full text-center">
                                <p className="text-gray-700 font-medium">Selected Time: {startTime} - {endTime}</p>
                                <p className="text-gray-700 font-medium">Repeat: {repeat}</p>
                                {repeat === 'Custom' && (
                                    <p className="text-gray-700 font-medium">Selected Date: {selectedDate || 'No date selected'}</p>
                                )}
                            </div>
                        </div>
                    </div>

         
                    <button 
                        className="absolute bottom-4 right-4 bg-primary-dark text-white py-2 px-6 rounded-md"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
                </div>
            </div>

      
            {savedValues.startTime && (
                <div className="mt-4 p-4 bg-gray-100 border rounded-md">
                    <h3 className="text-lg font-semibold text-gray-700">Saved Values</h3>
                    <p><strong>Start Time:</strong> {savedValues.startTime}</p>
                    <p><strong>End Time:</strong> {savedValues.endTime}</p>
                    <p><strong>Repeat:</strong> {savedValues.repeat}</p>
                    <p><strong>Date:</strong> {savedValues.date}</p>
                </div>
            )}
        </LandlordLayout>
    );
};

export default Property;
