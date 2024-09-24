import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

interface Tenant {
        id: string,
        firstName: string,
        middleName: string,
        lastName: string,
        companyName: string,
        industry: string,
        spaceType: string,
        spaceId: string,
        tenantEmail: string,
        phoneNumber: string
}

const TenantCard: React.FC<Tenant> = ({
    id,
    firstName,
    middleName,
    lastName,
    companyName,
    industry,
    spaceType,
    spaceId,
    tenantEmail,
    phoneNumber
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
   
      <div className="mt-4">
        <div className='flex justify-between mt-2 text-gray-500 text-sm'>
          <h3 className="font-bold text-secondary-dark text-lg">
            {companyName}
          </h3>
          <span className="text-secondary-light"> {industry}</span>
        </div>
        <hr className='my-4'/>
        <div className="flex justify-between mt-2 items-start text-gray-500 text-sm">
          <span>Name: {firstName} {middleName}</span>
          <span>Listing Type: {spaceType}</span>
          
        </div>
        <div className="flex justify-between mt-2 text-gray-700 text-sm">
          <span>Phone: {phoneNumber}</span>
          <span className='mr-2'>Listing ID: {spaceId}</span>
        </div>
        <div className="flex justify-between mt-2 text-gray-700 text-sm">
          <span>Email: {tenantEmail}</span>
        
        </div>
      </div>
      <div className="mt-4 w-full flex justify-end">
        <Link to={`/listing-detail/${id}`}>
          <button className=" bg-primary-dark hover:bg-secondary-dark text-white text-sm py-2 px-4 text-center rounded-lg">
            <FontAwesomeIcon icon={faEye} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TenantCard;
