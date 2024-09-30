import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tenant } from '../../types/tenant';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getAgreementById } from '../agreement/agreementSlice';
import { getListingById } from '../listings/listingSlice';

// interface Tenant {
//         id: string,
//         firstName: string,
//         middleName: string,
//         lastName: string,
//         companyName: string,
//         industry: string,
//         spaceType: string,
//         spaceId: string,
//         tenantEmail: string,
//         phoneNumber: string
// }

type TenantProp = {
  tenant: Tenant;
}

const TenantCard: React.FC<TenantProp> = ({tenant}) => {
  const dispatch = useDispatch<AppDispatch>();
  const lease = useSelector((state: RootState) => state.agreement.agreement) || [{}];
  const space = useSelector((state:RootState)=>state.listing.listing) || [{}];

  useEffect(()=>{
    dispatch(getAgreementById(tenant.lease_id));
  });

  useEffect(()=>{
    dispatch(getListingById(lease.id));
  },[lease]);



  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
   
      <div className="mt-4">
        <div className='flex justify-between mt-2 text-gray-500 text-sm'>
          <h3 className="font-bold text-secondary-dark text-lg">
            {tenant.company_name}
          </h3>
          <span className="text-secondary-light"> {tenant.industry}</span>
        </div>
        <hr className='my-4'/>
        <div className="flex justify-between mt-2 items-start text-gray-500 text-sm">
          <span>Name: {tenant.first_name} {tenant.middle_name}</span>
          <span>Listing Type: {space.space_purpose}</span>
          
        </div>
        <div className="flex justify-between mt-2 text-gray-700 text-sm">
          <span>Phone: {tenant.phone_number}</span>
          <span className='mr-2'>Listing ID:{space.space_id}</span>
        </div>
        <div className="flex justify-between mt-2 text-gray-700 text-sm">
          <span>Email: {tenant.email}</span>
        
        </div>
      </div>
      <div className="mt-4 w-full flex justify-end">
        <Link to={`/listing-detail/${tenant.id}`}>
          <button className=" bg-primary-dark hover:bg-secondary-dark text-white text-sm py-2 px-4 text-center rounded-lg">
            <FontAwesomeIcon icon={faEye} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TenantCard;
