
import { ApprovePayment, MakePayment } from "../../types/payment";
import baseApi from "../../utils/api";

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        makePayment: builder.mutation({
            query: (payment: MakePayment)=>({
                url: '/payment/create',
                method: 'POST',
                body: payment
            }),
        }),

        approvePayment: builder.mutation({
            query: (payment: ApprovePayment)=>({
                url: `/payments/${payment.payment_id}/approve`,
                method: 'POST',
                body: payment
            }),
        }),
        
        getAllPayments: builder.query({
            query: ()=>({
                url: '/payments/get_all',
                method: 'GET'
            }),
        }),

        getPaymentById: builder.query({
            query: (id:number)=>({
                url: `/payments/${id}`,
                method: 'GET'
            }),
        }),
    }),
   
});