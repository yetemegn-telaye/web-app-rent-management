import React, { useState } from 'react';
import FilterPayment from '../../components/payment/FilterPayment';
import PaymentTable from '../../components/payment/PaymentTable';


const payments = [
  { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'Delayed' },
  { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid' },
  { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid' },
  { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid' },
  { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid' },
  { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid' },
    { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid' },
    { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid' },
    { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid' },
    { invoiceId: '#505524082', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid' },
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
            <FilterPayment onSearchChange={handleSearchChange} onFilterClick={handleFilterClick} />
            <PaymentTable payments={filteredPayments} userType={userType} onViewClick={handleViewClick} />
        </div>
    );
}

export default Payment;
