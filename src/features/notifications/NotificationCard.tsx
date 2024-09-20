import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMinus } from '@fortawesome/free-solid-svg-icons';

interface NotificationCardProps {
  title: string;
  description: string;
  time: string;
  type?: 'info' | 'warning' | 'success' | 'delayed';
  checked: boolean; 
  onCheck: () => void; 
  onClear: () => void; 
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title, description, time, type = 'info', checked, onCheck, onClear
}) => {
  const typeStyles = {
    info: 'bg-blue-50 text-blue-600 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    success: 'bg-green-50 text-green-600 border-green-200',
    delayed: 'bg-red-50 text-red-600 border-red-200'
  };

  return (
    <div className='flex w-full'>
          <input
        type="checkbox"
        className="mr-4"
        checked={checked}
        onChange={onCheck}
      />
    <div className={`border w-full rounded-lg p-4 mb-4 flex items-start ${typeStyles[type]} shadow-sm relative`}>
    
    

    
      <div className="flex-shrink-0">
        <FontAwesomeIcon icon={faBell} className={`text-xl ${type === 'info' ? 'text-blue-500' : type === 'warning' ? 'text-yellow-500' : type === 'success' ? 'text-green-500' : 'text-red-500'}`} />
      </div>

   
      <div className="ml-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
        <span className="text-xs text-gray-400">{time}</span>
      </div>

      {checked && (
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-red-500 hover:text-red-700"
          onClick={onClear}
        >
          <FontAwesomeIcon icon={faMinus} className="text-xl" />
        </button>
      )}
    </div>
    </div>
  );
};

export default NotificationCard;
