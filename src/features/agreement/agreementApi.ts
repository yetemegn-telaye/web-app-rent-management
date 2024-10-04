import { CreateLease, Lease } from "../../types/lease";
import baseApi from "../../utils/api";

export const agreementApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        createAgreement: builder.mutation({
            query: (agreement: CreateLease)=>({
                url: '/leases/create',
                method: 'POST',
                body: agreement
            }),
        }),

        getAllAgreements: builder.query({
            query: ()=>({
                url: '/leases/get_all',
                method: 'GET'
            }),
        }),
        
        getAgreementById: builder.query({
            query: (id:number)=>({
                url: `/leases/${id}`,
                method: 'GET'
            }),
        }),
    }),
   
});