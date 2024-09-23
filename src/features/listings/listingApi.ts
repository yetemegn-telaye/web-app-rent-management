import { get } from "http";
import baseApi from "../../utils/api";
import { getLCP } from "web-vitals";
import { CreateSpace } from "../../types/space";
import { CreateSpaceFeature } from "../../types/space-features";

export const listingApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        addListing: builder.mutation({
            query: (listing:CreateSpace)=>({
                url: '/listings',
                method: 'POST',
                body: listing
            }),
        }),
        addListingFeature: builder.mutation({
            query: (features:CreateSpaceFeature)=>({
                url: '/features',
                method: 'POST',
                body: features
            }),
        }),
        getAllListings: builder.query({
            query: ()=>({
                url: '/all_spaces',
                method: 'GET'
            }),
        }),

        getListingById: builder.query({
            query: (id:number)=>({
                url: `/space/${id}`,
                method: 'GET'
            }),
        }),
        getListingFeatures: builder.query({
            query: (id:number)=>({
                url: `/features/${id}`,
                method: 'GET'
            }),
        }),
        
        getListingByArea: builder.query({
            query: (area:string)=>({
                url: `/spaces/${area}`,
                method: 'GET'
            }),
        }),
        getListingByStatus: builder.query({
            query: (space_status:string)=>({
                url: `/spaces/${space_status}`,
                method: 'GET'
            }),
        }),
        getListingByPrice: builder.query({
            query: (price:number)=>({
                url: `/spaces/${price}`,
                method: 'GET'
            }),
        }),
        getListingByFloor: builder.query({ 
            query: (floor:number)=>({
                url: `/spaces/${floor}`,
                method: 'GET'
            }),
        }),
       
    
    }),
});

export const {} = listingApi;