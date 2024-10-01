import React, { useEffect, useState } from 'react';
import FilterPayment from './FilterPayment';
import PaymentTable from './PaymentTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IPayment }  from '../../types/payment';




type PaymentProps = {
    userType: 'landlord' | 'tenant';
    all_payments: IPayment[];
}

const Payment: React.FC<PaymentProps> = ({userType,all_payments}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<string | null>(null);

   useEffect(()=>{
    console.log(all_payments);
    },[]);

    const handleViewClick = (invoiceId: string) => {
        console.log(`View details for ${invoiceId}`);
    };

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const handleFilterClick = (filter: string) => {
        setFilter(filter);
    };

    const filteredPayments = all_payments.filter(payment => {
        return (
            payment.invoice_id.toString().includes(searchTerm) &&
            (!filter || payment.status.toLowerCase() === filter)
        );
    });

    return (
        <div className="w-full bg-primary min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white border-b rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-light text-gray-700">OFF01 Payment History</h2>
            {
                userType === 'tenant' &&
                <div className='flex flex-col md:border-l border-gray-300 pl-8'>
                    <p className="text-sm text-gray-600">Account Name: Ambassador Trading PLC.</p>
                    <p className="text-sm text-gray-600">Account Number: 100023099900</p>
                </div>
            }
        </div>
        <FilterPayment onSearchChange={handleSearchChange} onFilterClick={handleFilterClick} />
        <PaymentTable payments={filteredPayments} userType={userType} onViewClick={handleViewClick} />
    </div>
    
    );
}

export default Payment;
