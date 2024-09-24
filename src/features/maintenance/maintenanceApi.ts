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
            query: (maintenanceRequest: StartMaintenanceFix)=>({
                url: '/maintenance_request/start',
                method: 'POST',
                body: maintenanceRequest
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
                url: '/maintenance_requests/get_all',
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