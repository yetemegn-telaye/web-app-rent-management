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

        getAllTenants: builder.query({
            query:()=>({
                url: '/tenants/get_all',
                method: 'GET'
            })

        }),

        getTenantById: builder.query({
            query: (id:number)=>({
                url: `/tenants/${id}`,
                method: 'GET'
            }),
        }),
    }),
});