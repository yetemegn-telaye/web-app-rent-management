import { useState } from "react";
import Calendar from "../../components/Calendar";

const SetOpenDate: React.FC = () => {
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
        const formattedDates = selectedDates.map(date => 
            `${date.dayName}, ${date.day} - ${new Date(date.year, date.month).toLocaleString('default', { month: 'long' })} - ${date.year}`
        ).join(', ');
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
        <div className="flex flex-col w-full h-4/5 border items-center justify-center bg-white relative">
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
        {savedValues.startTime && (
                <div className="mt-4 p-4 bg-gray-100 border rounded-md">
                    <h3 className="text-lg font-semibold text-gray-700">Saved Values</h3>
                    <p><strong>Start Time:</strong> {savedValues.startTime}</p>
                    <p><strong>End Time:</strong> {savedValues.endTime}</p>
                    <p><strong>Repeat:</strong> {savedValues.repeat}</p>
                    <p><strong>Date:</strong> {savedValues.date}</p>
                </div>
            )}
    </div>
    
    )
}
export default SetOpenDate;
