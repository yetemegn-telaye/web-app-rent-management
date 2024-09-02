import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Helper function to generate dates for the calendar
const generateCalendarDates = (year: number, month: number) => {
    const dates: (number | null)[] = [];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty slots for days of the week before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        dates.push(null);
    }

    // Add all the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        dates.push(day);
    }

    return dates;
};

interface SelectedDate {
    day: number;
    month: number;
    year: number;
    dayName: string;
}

interface CalendarProps {
    onDateChange: (selectedDates: SelectedDate[]) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateChange }) => {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);

    const currentDay = today.getDate(); // Current date
    const dates = generateCalendarDates(year, month);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handleNextMonth = () => {
        setMonth((prevMonth) => {
            if (prevMonth === 11) {
                setYear((prevYear) => prevYear + 1);
                return 0;
            }
            return prevMonth + 1;
        });
    };

    const handlePreviousMonth = () => {
        setMonth((prevMonth) => {
            if (prevMonth === 0) {
                setYear((prevYear) => prevYear - 1);
                return 11;
            }
            return prevMonth - 1;
        });
    };

    const handleDateClick = (date: number) => {
        const dayIndex = new Date(year, month, date).getDay();
        const selectedDate = { day: date, month, year, dayName: dayNames[dayIndex] };
        setSelectedDates((prevSelectedDates) => {
            const alreadySelected = prevSelectedDates.find(
                (d) => d.day === date && d.month === month && d.year === year
            );
            let newSelectedDates: SelectedDate[];
            if (alreadySelected) {
                newSelectedDates = prevSelectedDates.filter(
                    (d) => !(d.day === date && d.month === month && d.year === year)
                );
            } else {
                newSelectedDates = [...prevSelectedDates, selectedDate];
            }
            onDateChange(newSelectedDates); // Trigger the callback function with the array of selected dates
            return newSelectedDates;
        });
    };

    const handleSaveDates = () => {
        console.log('Selected Dates:', selectedDates);
        alert(
            `Selected Dates: ${selectedDates
                .map(
                    (d) =>
                        `${d.dayName}, ${d.day} - ${new Date(d.year, d.month).toLocaleString('default', {
                            month: 'long',
                        })} - ${d.year}`
                )
                .join(', ')}`
        );
    };

    return (
        <div className="flex-1">
            <div className="border rounded-lg p-4 relative">
                <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-gray-500">
                        {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}
                    </h4>
                    <div className="space-x-2">
                        <button onClick={handlePreviousMonth}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button onClick={handleNextMonth}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-7 gap-2">
                    {/* Render the day names */}
                    {dayNames.map((dayName, index) => (
                        <div
                            key={index}
                            className="flex justify-center items-center h-8 w-8 text-sm font-semibold"
                        >
                            {dayName}
                        </div>
                    ))}
                    {/* Render the calendar grid */}
                    {dates.map((date, index) => (
                        <div
                            key={index}
                            onClick={() => date && handleDateClick(date)}
                            className={`flex justify-center items-center h-8 w-8 text-sm rounded-full cursor-pointer ${
                                date
                                    ? date === currentDay &&
                                      month === today.getMonth() &&
                                      year === today.getFullYear()
                                        ? 'bg-primary text-dark'
                                        : selectedDates.find(
                                              (d) =>
                                                  d.day === date &&
                                                  d.month === month &&
                                                  d.year === year
                                          )
                                        ? 'bg-secondary-dark text-white'
                                        : 'text-black'
                                    : 'opacity-0'
                            }`}
                        >
                            {date}
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSaveDates}
                    className={`${
                        selectedDates.length === 0 ? 'hidden' : 'absolute'
                    } bottom-4 right-4 bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-secondary-dark`}
                >
                    Done
                </button>
            </div>
            <div className="flex flex-col flex-wrap justify-evenly">
                <p className="my-2 font-medium text-secondary-dark text-center">Selected Dates</p>
                {selectedDates.length > 0 &&
                    selectedDates.map((date, index) => (
                        <div
                            key={index}
                            className="bg-primary-dark text-center text-white p-1 rounded-lg mt-2"
                        >
                            {`${date.dayName}, ${date.day} - ${new Date(date.year, date.month).toLocaleString(
                                'default',
                                { month: 'long' }
                            )} `}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Calendar;
