import React, { useState } from 'react';
import FilterPayment from './FilterPayment';
import PaymentTable from './PaymentTable';


const payments = [
  { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'Delayed',paid_by:'abebe' },
  { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid',paid_by:'abebe' },
  { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid',paid_by:'abebe' },
  { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid',paid_by:'abebe' },
  { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid',paid_by:'abebe' },
  { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid',paid_by:'abebe' },
    { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid',paid_by:'abebe' },
    { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid',paid_by:'abebe' },
    { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid',paid_by:'abebe' },
    { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'waiting for approval',paid_by:'abebe' },
];

type PaymentProps = {
    userType: 'landlord' | 'tenant';
}

const Payment: React.FC<PaymentProps> = ({userType}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<string | null>(null);

    const handleViewClick = (invoiceId: string) => {
        console.log(`View details for ${invoiceId}`);
    };

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const handleFilterClick = (filter: string) => {
        setFilter(filter);
    };

    const filteredPayments = payments.filter(payment => {
        return (
            payment.invoiceId.includes(searchTerm) &&
            (!filter || payment.status.toLowerCase() === filter)
        );
    });

    return (
        <div className="w-full bg-primary min-h-screen">
               <div className="flex justify-between items-center p-4 bg-white border-b rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-light text-gray-700">OFF01 Payment History</h2>
        {
            userType === 'tenant' && 
            <div className='border-l border-gray-300 pl-8 h-full'>
            <p className="text-sm text-gray-600">Account Name: Ambasador Trading PLC. </p>
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
