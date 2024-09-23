import { CreateTenant } from "../../types/tenant";
import baseApi from "../../utils/api";

export const tenantApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        createTenant: builder.mutation({
            query: (tenant: CreateTenant)=>({
                url: '/tenants/create',
                method: 'POST',
                body: tenant
            }),
        }),
    }),
});