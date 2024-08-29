// src/components/PropertyDetail.tsx
import React from 'react';
import LandlordLayout from '../../layout/LandlordLayout';

const Property: React.FC = () => {
    return (
        <LandlordLayout>
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex space-x-6">
                {/* Property Image */}
                <div className="flex-shrink-0">
                    <img
                        className="w-48 h-48 object-cover rounded-lg"
                        src="https://via.placeholder.com/150"
                        alt="Property"
                    />
                    <div className="mt-2 flex space-x-2">
                        <img
                            className="w-12 h-12 object-cover rounded-lg"
                            src="https://via.placeholder.com/150"
                            alt="Thumbnail"
                        />
                        <img
                            className="w-12 h-12 object-cover rounded-lg"
                            src="https://via.placeholder.com/150"
                            alt="Thumbnail"
                        />
                        <img
                            className="w-12 h-12 object-cover rounded-lg"
                            src="https://via.placeholder.com/150"
                            alt="Thumbnail"
                        />
                    </div>
                </div>

                {/* Property Details */}
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">4 KILO</h3>
                    <p className="text-gray-500">Total Spaces: 50 spaces</p>
                    <p className="text-gray-500">Available Spaces: 20</p>
                    <p className="text-gray-500">Area: 1000 Sq ft.</p>
                    <p className="text-gray-500">Floors: 8 Floors</p>
                    <p className="text-gray-500">Total Parking Spaces: 30 parking spaces</p>

                    <div className="mt-4">
                        <label className="text-sm font-semibold text-gray-700">Current Manager</label>
                        <input
                            type="text"
                            value="Abebe Daniel"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            readOnly
                        />
                    </div>
                    <div className="mt-4">
                        <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md">View Report</button>
                    </div>
                </div>
            </div>

            {/* Calendar and Time Set */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800">Set Open House Date</h3>
                <div className="mt-4 flex space-x-4">
                    <div className="flex-1">
                        <div className="border rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-gray-500">November 2024</h4>
                            <div className="mt-2 grid grid-cols-7 gap-2">
                                {/* Calendar Grid Example */}
                                <div className="flex justify-center items-center h-8 w-8 text-sm">1</div>
                                <div className="flex justify-center items-center h-8 w-8 text-sm">2</div>
                                <div className="flex justify-center items-center h-8 w-8 text-sm">3</div>
                                {/* Add more dates as needed */}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-500">Set Time</label>
                            <div className="flex space-x-2">
                                <input type="time" value="14:30" className="p-2 border border-gray-300 rounded-md" />
                                <input type="time" value="14:30" className="p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-500">Repeat</label>
                            <select className="p-2 border border-gray-300 rounded-md w-full">
                                <option>Monday - Friday</option>
                                <option>Weekends</option>
                                <option>Custom</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </LandlordLayout>
    );
};

export default Property;
