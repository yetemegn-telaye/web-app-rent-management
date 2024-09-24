import { Building } from "../../types/building";
import baseApi from "../../utils/api";

export const buildingApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        getBuildingById: builder.query({
            query: (id: number)=>({
                url: `/building/get_one_building/${id}`,
                method: 'GET',
            }),
        }),
       
    }),
    });