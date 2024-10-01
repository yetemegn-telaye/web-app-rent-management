import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import PaymentModal from './PaymentModal';
import PayModal from './PayModal';
import SuccessModal from '../../components/SuccesModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEye, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { IPayment } from '../../types/payment';

interface PaymentTableProps {
  payments: IPayment[];
  totalPayment: number;  
  onViewClick: (invoiceId: string) => void;
  userType: 'landlord' | 'tenant';
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments, totalPayment, onViewClick, userType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null);
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

  const handleViewClick = (payment: IPayment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handlePayClick = (invoice_id: number) => {
    setSelectedInvoice(invoice_id);
    setIsPayModalOpen(true);
    console.log("Pay clicked for", invoice_id);
  };

  const handleConfirmPayment = (file: File | null) => {
    console.log("Processing payment for invoice:", selectedInvoice, "with file:", file);
    setIsPayModalOpen(false);
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-2 text-gray-600 text-center">Invoice_ID</th>
              <th className="p-2 text-gray-600 text-center">Due Date</th>
              <th className="text-center p-2 text-gray-600">Utility</th>
              <th className="text-center p-2 text-gray-600">Amount</th>
              <th className="text-center p-2 text-gray-600">Total Amount</th>
              <th className="text-center p-2 text-gray-600">Status</th>
              <th className="text-center p-2 text-gray-600">Paid By</th>
              <th className="p-2 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment, index) => (
              <tr key={index} className={`border-b hover:bg-primary ${payment.status === 'Delayed' ? 'border border-danger border-opacity-15 rounded-xl bg-red-100 animate-pulse' : ''}`}>
                <td className="p-2 text-center">{payment.invoice_id}</td>
                <td className="p-2 text-center">{payment.due_date}</td>
                <td className="p-2 text-center">{payment.utility_price}</td>
                <td className="p-2 text-center">{payment.payment_price}</td>
                <td className="p-2 text-center">{payment.total_rent_price}</td>
                <td className={`text-center p-2 ${payment.status === 'Delayed' ? 'text-danger font-bold' : 'text-secondary-dark'}`}>{payment.status}</td>
                <td className="p-2 text-center">{payment.paid_by}</td>
                <td className="p-2">
                  {payment.status === 'Delayed' && userType === 'tenant' ? (
                    <button 
                      className="bg-danger text-white hover:bg-red-600 px-4 py-1 rounded-md" 
                      onClick={() => handlePayClick(payment.invoice_id)}
                    >
                      Pay
                    </button>
                  ) : payment.status === 'Delayed' && userType === 'landlord' ? (
                    <button 
                      className="bg-danger text-white hover:bg-red-600 px-4 py-1 rounded-md" 
                      onClick={() => alert('Tenant has been alerted successfully!')}
                    >
                      Alert 
                    </button>
                  ) : payment.status === 'waiting for approval' && userType === 'landlord' ? (
                    <div className='flex gap-1'>
                      <button 
                        className="bg-success flex items-center text-white hover:bg-primary-dark px-2 py-1 rounded-md" 
                        onClick={() => alert('Payment has been approved successfully!')}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} className='size-4'/>
                      </button>
                      <button 
                        className="bg-danger flex items-center text-white hover:bg-red-700 px-2 py-1 rounded-md" 
                        onClick={() => alert('Payment has been approved successfully!')}
                      >
                        <FontAwesomeIcon icon={faXmarkCircle} className='size-4'/>
                      </button>
                    </div>
                  ) : (
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
            <tr className="bg-gray-100 rounded-xl font-bold">
              <td colSpan={8} className="text-right text-lg px-4 py-4">
                <span className='text-gray-400 font-light mr-2'>Total Rent:</span>
                {totalPayment} ETB
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message='Your Payment has been processed successfully!'
      />
    </div>
  );
};

export default PaymentTable;
