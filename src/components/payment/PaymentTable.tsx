import React, { useState } from 'react';
import Pagination from '../Pagination';
import PaymentModal from './PaymentModal';
import PayModal from './PayModal';
import SuccessModal from '../SuccesModal';

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
      <div className="flex justify-between items-center p-4 bg-white border-b mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Payment History</h2>
        <div className='border-l border-gray-300 pl-8 h-full'>
          <p className="text-sm text-gray-600">Account Name: Ambasador Trading PLC. </p>
          <p className="text-sm text-gray-600">Account Number: 100023099900</p>
        </div>
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2 text-gray-600">Invoice_ID</th>
            <th className="text-left p-2 text-gray-600">Date</th>
            <th className="text-left p-2 text-gray-600">Utility</th>
            <th className="text-left p-2 text-gray-600">Amount</th>
            <th className="text-left p-2 text-gray-600">Total Amount</th>
            <th className="text-left p-2 text-gray-600">Status</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index} className={`border-b ${payment.status === 'Delayed' ? 'bg-red-100' : ''}`}>
              <td className="p-2">{payment.invoiceId}</td>
              <td className="p-2">{payment.date}</td>
              <td className="p-2">{payment.utility}</td>
              <td className="p-2">{payment.amount}</td>
              <td className="p-2">{payment.totalAmount}</td>
              <td className={`p-2 ${payment.status === 'Delayed' ? 'text-red-600 font-bold' : 'text-secondary-dark'}`}>
                {payment.status}
              </td>
              <td className="p-2">
                {payment.status === 'Delayed' && userType === 'tenant' ? (
                  <button 
                    className="bg-red-600 text-white hover:bg-red-700 px-4 py-1 rounded-md" 
                    onClick={() => handlePayClick(payment.invoiceId)}
                  >
                    Pay
                  </button>
                ) : (
                  <button 
                    className="bg-primary-dark text-white hover:bg-secondary-dark px-4 py-1 rounded-md" 
                    onClick={() => handleViewClick(payment)}
                  >
                    View
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
