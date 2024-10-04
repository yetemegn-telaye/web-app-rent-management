import { useEffect, useState } from "react";
import Payment from ".";
import PaymentTable from "./PaymentTable"
import LandlordLayout from "../../layout/LandlordLayout"
import FilterPayment from "./FilterPayment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllPayments, getTotalPaymentAllSpace } from "./paymentSlice";

const payments = [
    { invoiceId: 505524085, date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'Delayed', paid_by: 'abebe' },
    { invoiceId: 505524082, date: '6-12-2023', utility: '3,000 birr', amount: '45,000', totalAmount: '48,000 birr', status: 'paid', paid_by: 'abebe'  },
  ];
  

const AllPayment: React.FC = ()=>{
    const dispatch = useDispatch<AppDispatch>();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<string | null>(null);

    const defaultPayment = [{
        id: 0,
        invoice_id: 0,
        invoice_image: [],
        status: "-",
        due_date: "-",
        paid_date: "-",
        payment_price: 0,
        utility_price: 0,
        total_rent_price: 0,
        paid_by: 0,
        space_id: 0,
        tenant_id: 0,
        lease_id: 0
    }];
    const all_payments =  useSelector((state: RootState) => state.payment.payments)|| defaultPayment;
    const total_payment_all_space = useSelector((state: RootState) => {
        const totalPaymentData = state.payment.total_payment_all_space;
        return Array.isArray(totalPaymentData) ? { totalPayment: 0 } : totalPaymentData;
      }) as { totalPayment: number };


    useEffect(()=>{
        dispatch(getAllPayments());
        dispatch(getTotalPaymentAllSpace());
    },[dispatch]);

    const handleViewClick = (invoiceId: string) => {
        console.log(`View details for ${invoiceId}`);
    };

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const handleFilterClick = (filter: string) => {
        setFilter(filter);
    };

    const filteredPayments = all_payments.filter((payment: any) => {
        return (
            payment.invoice_id.toString().includes(searchTerm) &&
            (!filter || payment.status.toLowerCase() === filter)
        );
    });
    return(
        <LandlordLayout>
            <FilterPayment onSearchChange={handleSearchChange} onFilterClick={handleFilterClick} />
            <PaymentTable payments={filteredPayments} userType="landlord" totalPayment={total_payment_all_space!==undefined ? total_payment_all_space.totalPayment:0} onViewClick={handleViewClick} />
        </LandlordLayout>
    )
}
export default AllPayment;