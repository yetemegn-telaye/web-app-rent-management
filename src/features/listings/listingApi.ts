import { get } from "http";
import baseApi from "../../utils/api";
import { getLCP } from "web-vitals";
import { CreateSpace } from "../../types/space";
import { CreateSpaceFeature } from "../../types/space-features";
import { CreateSpaceState } from "../../types/current-space-state";
import { getAllListings } from "./listingSlice";

export const listingApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        addListing: builder.mutation({
            query: (listing:CreateSpace)=>({
                url: '/spaces/create',
                method: 'POST',
                body: listing
            }),
        }),
        addListingFeature: builder.mutation({
            query: (features:CreateSpaceFeature)=>({
                url: '/space_features/create',
                method: 'POST',
                body: features
            }),
        }),
        getAllListings: builder.query({
            query: ()=>({
                url: '/spaces/all_spaces',
                method: 'GET'
            }),
        }),

        getListingById: builder.query({
            query: (id:number)=>({
                url: `/spaces/${id}`,
                method: 'GET'
            }),
        }),
        getAllListingFeatures: builder.query({
            query: ()=>({
                url: '/space_features/all_space_features',
                method: 'GET'
            }),
        }),
        getListingFeatures: builder.query({
            query: (id:number)=>({
                url: `/space_features/${id}`,
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
       
        createSpaceState: builder.mutation({
            query: (spaceState:CreateSpaceState)=>({
                url: '/space_states/create',
                method: 'POST',
                body: spaceState
            }),
        }),
        
        getSpaceState: builder.query({
            query: (id:number)=>({
                url: `/space_state/${id}`,
                method: 'GET'
            }),
        }),
    }),
});

export const {} = listingApi;