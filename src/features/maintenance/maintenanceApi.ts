import { ApproveMaintenanceRequest, CreateMaintenanceRequest, StartMaintenanceFix } from "../../types/maintenance-request";
import baseApi from "../../utils/api";

export const maintenanceApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        createMaintenanceRequest: builder.mutation({
            query: (maintenanceRequest: CreateMaintenanceRequest)=>({
                url: '/maintenance_requests/create',
                method: 'POST',
                body: maintenanceRequest
            }),
        }),

        startMaintenance: builder.mutation({
            query: (id: number)=>({
                url: `/maintenance_requests/started/${id}`,
                method: 'PATCH',
            }),
        }),

        approveMaintenance: builder.mutation({
            query: (maintenanceRequest: ApproveMaintenanceRequest)=>({
                url: '/maintenance_request/approve',
                method: 'POST',
                body: maintenanceRequest
            }),
        }),
        
        getAllMaintenance: builder.query({
            query: ()=>({
                url: '/maintenance_requests/all_requests',
                method: 'GET'
            }),
        }),

        getMaintenanceById: builder.query({
            query: (id:number)=>({
                url: `/maintenance_requests/${id}`,
                method: 'GET'
            }),
        }),
    }),
   
});