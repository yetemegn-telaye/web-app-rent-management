import React from 'react';


interface Payment{
   amount: number,
   status: string,
    date: string, 
    spaceType: string,
    spaceId: string
}

interface PaymentsThisWeekCardProps {
  payments: Payment[];
}

const PaymentsThisWeekCard: React.FC<PaymentsThisWeekCardProps> = ({ payments }) => (
  <div className="bg-white shadow-lg rounded-md p-4 h-full">
    <h2 className="text-lg font-mediun text-secondary-dark mb-6">Payments This Week</h2>
    {payments.map((payment, index) => (
      <>
      <div className='flex justify-between my-2 items-center' key={index}>
        <div className='flex flex-col text-gray-500 font-light text-sm'>
        <p>{payment.spaceType} {payment.spaceId}</p>
        <p>Total: {payment.amount}</p>
        </div>
        <p className='text-danger font-light'>{payment.status}</p>
      </div>
      <hr/>
      </>
    ))  
    }
  </div>
);

export default PaymentsThisWeekCard;
