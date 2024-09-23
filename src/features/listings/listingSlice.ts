import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateSpace, Space } from "../../types/space";
import { CreateSpaceFeature, SpaceFeature } from "../../types/space-features";
import { listingApi } from "./listingApi";
import { act } from "react";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { stat } from "fs";


interface ListingState {
   listings: Space[],
   listing: Space,
   feature: SpaceFeature,
   isLoading: boolean,
   message: string| null,
   error: string | null
}

const initialState: ListingState = {
    listings: [],
    listing: {
        id: 0,
        space_id: "",
        size: 0,
        pictures: [],
        coverImage: "",
        on_floor: 0,
        space_purpose: "",
        price: 0,
        number_of_rooms: 0,
        space_status: "",
        num_of_views: 0,
        space_feature_id: 0
    },
    feature: {
        id: 0,
        surveillance_camera: false,
        previous_use: "",
        balcony: false,
        furnished: false,
        natural_light: false,
        high_ceiling: false,
        wall_paint: "",
        position_on_building: "",
        conference_rooms: 0,
        space_id: 0
    },
    isLoading: false,
    message: "",
    error: null
    };

export const addListing = createAsyncThunk(
    'listing/addListing',
    async (listing: CreateSpace , {dispatch,rejectWithValue}) => {
        try{
            
            const response = await dispatch(listingApi.endpoints.addListing.initiate(listing));
            console.log(response);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addListingFeature = createAsyncThunk(
    'listing/addListingFeature',
    async (feature: CreateSpaceFeature, {dispatch,rejectWithValue}): Promise<any> => {
        try{
            // const [logoutUserMutation] = useLogoutUserMutation();
            // const response = await logoutUserMutation(token).unwrap();
            const response = await dispatch(listingApi.endpoints.addListingFeature.initiate(feature));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllListings = createAsyncThunk(
    'listing/getAllListings',
    async (_, {dispatch,rejectWithValue}) => {
        try{
            const response = await dispatch(listingApi.endpoints.getAllListings.initiate(_));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getListingById = createAsyncThunk(
    'listing/getListingById',
    async(id:number, {dispatch,rejectWithValue}) => {
        try{
            const response = await dispatch(listingApi.endpoints.getListingById.initiate(id));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const getListingFeatures = createAsyncThunk(
    'listing/getListingFeatures',
    async(id:number,{dispatch,rejectWithValue})=>{
        try{
            const response = await dispatch(listingApi.endpoints.getListingFeatures.initiate(id));
            return response.data;
        } catch (error: any){
            return rejectWithValue(error.response.data);
        }
    }
)


const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addListing.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addListing.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listing = action.payload.user;
            state.message = action.payload.message;
        });
        builder.addCase(addListing.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(addListingFeature.pending, (state, action: any) => {
            state.isLoading = true;
            state.listing.space_id = action.payload.space_id;
        });
        builder.addCase(addListingFeature.fulfilled, (state, action) => {
            state.isLoading = false;
            state.feature = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(addListingFeature.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string | null;
        });

        // Get all listings
        builder.addCase(getAllListings.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllListings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listings = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(getAllListings.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string | null;
        });

        //get listing by id
        builder.addCase(getListingById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getListingById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listing = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(getListingById.rejected,(state,action)=>{
            state.isLoading= false;
            state.error = action.payload as string | null;
        });
 
        //get listing feature
        builder.addCase(getListingFeatures.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(getListingFeatures.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.feature = action.payload;
            state.message = action.payload.message;
        });
        builder.addCase(getListingFeatures.rejected,(state,action)=>{
            state.isLoading=false;
            state.error = action.payload as string | null;
        });


    }
});

export default listingSlice.reducer;