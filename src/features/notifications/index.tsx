import React, { useState } from 'react';
import LandlordLayout from '../../layout/LandlordLayout';
import NotificationCard from './NotificationCard';

// Define a proper type for notifications
type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'delayed';
};

const Notifications: React.FC = () => {
  // Sample notification data array
  const initialNotifications: Notification[] = [
    {
      id: 1,
      title: "New Listing Added",
      description: "A new listing has been added to your dashboard.",
      time: "5 minutes ago",
      type: "info"
    },
    {
      id: 2,
      title: "Payment Due",
      description: "A tenant's payment is due tomorrow.",
      time: "1 hour ago",
      type: "warning"
    },
    {
      id: 3,
      title: "Payment Received",
      description: "Payment for the listing 'Office CM002' has been successfully received.",
      time: "2 days ago",
      type: "success"
    },
    {
      id: 4,
      title: "Payment Delayed",
      description: "Payment for the listing 'Office CM002' is delayed by 2 days.",
      time: "2 days ago",
      type: "delayed"
    }
  ];

  // State to manage notifications
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  // State to manage checkboxes for each notification
  const [checkedNotifications, setCheckedNotifications] = useState<{ [key: number]: boolean }>({});

  // State to manage select all
  const [selectAll, setSelectAll] = useState(false);

  // Handle select all toggle
  const handleSelectAll = () => {
    const newCheckedState = notifications.reduce((acc, notification) => {
      acc[notification.id] = !selectAll; // Toggle all notifications
      return acc;
    }, {} as { [key: number]: boolean });
    setCheckedNotifications(newCheckedState);
    setSelectAll(!selectAll);
  };

  // Handle checkbox toggle for individual notifications
  const handleCheckboxToggle = (id: number) => {
    setCheckedNotifications((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  // Handle clearing individual notification
  const handleClearNotification = (id: number) => {
    setNotifications((prevState) => prevState.filter(notification => notification.id !== id));
    setCheckedNotifications((prevState) => {
      const newState = { ...prevState };
      delete newState[id];
      return newState;
    });
  };

  const handleClearAll = () => {
    setNotifications([]);
    setCheckedNotifications({});
    setSelectAll(false);
  };

  return (
    <LandlordLayout>
      <div className="flex items-center justify-between p-3 my-8 overflow-auto">
        <div className="flex flex-col items-start justify-between gap-2">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-secondary-dark">Notifications</h1>
            <p className="border border-secondary-light text-center px-2 mb-5 ml-2 rounded-full">
              {notifications.length}
            </p>
          </div>
          <span className="text-sm text-gray-500 font-light">View recent notifications</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-primary-dark text-white font-light p-2 rounded-lg"
            onClick={handleSelectAll}
          >
            {selectAll ? "Deselect All" : "Select All"}
          </button>

          {/* Conditionally render Clear All button only when selectAll is true */}
          {selectAll && (
            <button
              type="button"
              className="bg-red-600 text-white font-light p-2 rounded-lg"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            title={notification.title}
            description={notification.description}
            time={notification.time}
            type={notification.type}
            checked={!!checkedNotifications[notification.id]} // Checkbox state
            onCheck={() => handleCheckboxToggle(notification.id)} // Toggle checkbox
            onClear={() => handleClearNotification(notification.id)} // Clear notification
          />
        ))}
      </div>
    </LandlordLayout>
  );
};

export default Notifications;
