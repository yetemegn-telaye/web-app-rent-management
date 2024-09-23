import { CreateLease, Lease } from "../../types/lease";
import baseApi from "../../utils/api";

export const agreementApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        createAgreement: builder.mutation({
            query: (agreement: CreateLease)=>({
                url: '/lease/create',
                method: 'POST',
                body: agreement
            }),
        }),
    }),
   
});