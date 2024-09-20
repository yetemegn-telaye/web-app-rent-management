import React from 'react';
import AgreementView from "./AgreementView";
import TenantDoc from "../tenant/TenantDoc";

interface AgreementProps {
    isClosed: boolean; 
}

const Agreement: React.FC<AgreementProps> = ({ isClosed }) => {
    return (
        <div className='bg-white w-full shadow-lg h-auto p-4 sm:p-6 lg:p-12 mt-10'>
            {isClosed ? (
                <>
                    <div className="flex flex-col gap-10">
                    <h3 className="text-secondary-dark text-lg lg:text-xl font-light ml-2">Signed Agreement</h3>
                        <AgreementView />
                    </div>
                </>
            ) : (
                <div className='text-center text-lg sm:text-xl lg:text-2xl text-red-700 font-bold'>
                    This document is only for Rented Listings
                </div>
            )}
        </div>
    );
};

export default Agreement;
