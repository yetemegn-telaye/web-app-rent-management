import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import PaymentModal from './PaymentModal';
import PayModal from './PayModal';
import SuccessModal from '../../components/SuccesModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

interface PaymentRecord {
  invoiceId: string;
  date: string;
  utility: string;
  amount: string;
  totalAmount: string;
  status: string;
}

interface PaymentTableProps {
  payments: PaymentRecord[];
  onViewClick: (invoiceId: string) => void;
  userType: 'landlord' | 'tenant';
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments, onViewClick,userType }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);



  const itemsPerPage = 5;


  const totalPages = Math.ceil(payments.length / itemsPerPage);


  const currentPayments = payments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

 
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleViewClick = (payment: PaymentRecord) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };
   const handlePaymentConfirmation = (file: File | null) =>{
    setIsPayModalOpen(false);
    setShowSuccessModal(true);
   }


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const handlePayClick = (invoiceId: string) => {
    setSelectedInvoice(invoiceId);
    setIsPayModalOpen(true);
    console.log("Pay clicked for", invoiceId);
    
  };
  const handleConfirmPayment = (file: File | null) => {
    // Process the payment and file upload here
    console.log("Processing payment for invoice:", selectedInvoice, "with file:", file);
    handlePaymentConfirmation(file);
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
   
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="">
            <th className="text-left p-2 text-gray-600">Invoice_ID</th>
            <th className="text-left p-2 text-gray-600">Date</th>
            <th className="text-left p-2 text-gray-600">Utility</th>
            <th className="text-left p-2 text-gray-600">Amount</th>
            <th className="text-left p-2 text-gray-600">Total Amount</th>
            <th className="text-left p-2 text-gray-600">Status</th>
            <th className="text-left p-2 text-gray-600">Paid By</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index} className={`${payment.status === 'Delayed' ? 'border border-danger border-opacity-15 rounded-xl bg-red-100 animate-pulse' : ''}`}>
              <td className="p-2 text-center">{payment.status === 'Delayed' ?'-' : payment.invoiceId}</td>
              <td className="p-2">{payment.date}</td>
              <td className="p-2">{payment.utility}</td>
              <td className="p-2">{payment.amount}</td>
              <td className="p-2">{payment.totalAmount}</td>
              <td className={`p-2 ${payment.status === 'Delayed' ? 'text-danger font-bold' : 'text-secondary-dark'}`}>
                {payment.status}
              </td>
              <td className={`p-2`}>
                {payment.status==='paid' ? 'paid by tenant' : ''}
              </td>
              <td className="p-2">
                {payment.status === 'Delayed' && userType === 'tenant' ? (
                  <button 
                    className="bg-danger text-white hover:bg-red-600 px-4 py-1 rounded-md" 
                    onClick={() => handlePayClick(payment.invoiceId)}
                  >
                    Pay
                  </button>
                ) : 
                payment.status === 'Delayed' && userType === 'landlord' ? (
                  <button 
                    className="bg-danger text-white hover:bg-red-600 px-4 py-1 rounded-md" 
                    onClick={() => alert('Tenant has been alerted successfully!')}
                  >
                    Alert 
                  </button>
                ):
                (
                  <button 
                    className="bg-primary-dark text-white hover:bg-secondary-dark px-4 py-1 rounded-md" 
                    onClick={() => handleViewClick(payment)}
                  >
                    <FontAwesomeIcon icon={faEye} className='size-3'/>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4 mr-10">
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        payment={selectedPayment}
      />
      <PayModal
  isOpen={isPayModalOpen}
  onClose={() => setIsPayModalOpen(false)}
  onConfirm={handleConfirmPayment}
/>
  <SuccessModal isOpen = {showSuccessModal} onClose={()=>setShowSuccessModal(false)} 
    message='Your Payment has been processed successfully!'/>
    </div>
  );
};

export default PaymentTable;
