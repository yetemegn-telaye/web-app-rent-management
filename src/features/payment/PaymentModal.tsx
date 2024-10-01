import React from 'react';
import { IPayment } from '../../types/payment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: IPayment | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, payment }) => {
  if (!isOpen || !payment) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-w-3xl relative">
        <button
          className="absolute top-3 right-5 text-red-600 hover:text-gray-800"
          onClick={onClose}
        >
          X
        </button>

        <div className="flex p-4 rounded-lg shadow-sm">
        
          <div className=" w-1/3 flex items-start justify-center">
            <img
              src="https://via.placeholder.com/150" 
              alt="Rental Agreement"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

         
          <div className="w-2/3 pl-8">
          <div className=" text-right">
              <h3 className="text-2xl text-primary-dark underline">{payment.status}</h3>
            </div>
            <div className="mb-4 space-y-3">
              <h3 className="text-lg font-semibold">Payment Details</h3>
              <p className="text-gray-600"><strong>Payment Date:</strong> {payment.paid_date}</p>
              <p className="text-gray-600"><strong>Amount:</strong> {payment.payment_price} ETB</p>
              <p className="text-gray-600"><strong>Utility Payment:</strong> {payment.utility_price} ETB</p>
              <p className="text-gray-600"><strong>Total Amount:</strong> {payment.total_rent_price} ETB</p>
              <p className="text-gray-600"><strong>Paid by:</strong>Camco Trading PLC. </p>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
