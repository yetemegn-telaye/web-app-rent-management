import baseApi from "../../utils/api";
import { CreateSpace } from "../../types/space";
import { CreateSpaceFeature } from "../../types/space-features";
import { CreateSpaceState } from "../../types/current-space-state";

export const listingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Spaces ---
    addListing: builder.mutation({
      query: (listing: CreateSpace) => ({
        url: '/spaces', // JSON Server auto handles POST
        method: 'POST',
        body: listing,
      }),
    }),

    getAllListings: builder.query({
      query: () => '/spaces', // GET all spaces
    }),

    getListingById: builder.query({
      query: (id: number) => `/spaces/${id}`, // GET specific space
    }),

    getListingByArea: builder.query({
      query: (area: string) => `/spaces?area=${encodeURIComponent(area)}`,
    }),

    getListingByStatus: builder.query({
      query: (space_status: string) => `/spaces?space_status=${encodeURIComponent(space_status)}`,
    }),

    getListingByPrice: builder.query({
      query: (price: number) => `/spaces?price=${price}`,
    }),

    getListingByFloor: builder.query({
      query: (floor: number) => `/spaces?floor=${floor}`,
    }),

    // --- Space Features ---
    addListingFeature: builder.mutation({
      query: (features: CreateSpaceFeature) => ({
        url: '/space_features',
        method: 'POST',
        body: features,
      }),
    }),

    getAllListingFeatures: builder.query({
      query: () => '/space_features',
    }),

    getListingFeatures: builder.query({
      query: (id: number) => `/space_features/${id}`,
    }),

    // --- Space States ---
    createSpaceState: builder.mutation({
      query: (spaceState: CreateSpaceState) => ({
        url: '/space_states',
        method: 'POST',
        body: spaceState,
      }),
    }),

    getSpaceState: builder.query({
      query: (id: number) => `/space_states/${id}`,
    }),
  }),
});

export const {
  useAddListingMutation,
  useGetAllListingsQuery,
  useGetListingByIdQuery,
  useGetListingByAreaQuery,
  useGetListingByStatusQuery,
  useGetListingByPriceQuery,
  useGetListingByFloorQuery,
  useAddListingFeatureMutation,
  useGetAllListingFeaturesQuery,
  useGetListingFeaturesQuery,
  useCreateSpaceStateMutation,
  useGetSpaceStateQuery,
} = listingApi;
