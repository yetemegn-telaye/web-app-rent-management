import { useState } from "react";
import Payment from ".";
import PaymentTable from "./PaymentTable"
import LandlordLayout from "../../layout/LandlordLayout"
import FilterPayment from "./FilterPayment";

const payments = [
    { invoiceId: '-', date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'Delayed' },
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
  

const AllPayment: React.FC = ()=>{
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
    return(
        <LandlordLayout>
                        <FilterPayment onSearchChange={handleSearchChange} onFilterClick={handleFilterClick} />
            <PaymentTable payments={filteredPayments} userType="landlord" onViewClick={handleViewClick} />
        </LandlordLayout>
    )
}
export default AllPayment;