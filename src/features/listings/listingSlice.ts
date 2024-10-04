import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateSpace, Space } from "../../types/space";
import { CreateSpaceFeature, SpaceFeature } from "../../types/space-features";
import { listingApi } from "./listingApi";
import { act } from "react";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { stat } from "fs";
import { CreateSpaceState, SpaceState } from "../../types/current-space-state";


interface ListingState {
   listings: Space[],
   listing: Space,
   current_space_state: SpaceState,
   feature: SpaceFeature,
   all_features: SpaceFeature[],
   isLoading: boolean,
   message: string| null,
   error: string | null
}

const initialState: ListingState = {
    listings: [],
    all_features: [],
    listing: {
        id: 0,
        space_id: "",
        size: 0,
        listed_date: '',
        space_images: [],
        cover_image: [],
        floor: 0,
        space_purpose: "",
        price: 0,
        number_of_rooms: 0,
        space_status: "",
        number_of_views: 0,
        building_id: 0,
    },
    feature: {
        id: 0,
        surveillance_camera: false,
        previous_use: "",
        balcony: false,
        furnished: false,
        natural_lighting: false,
        high_ceiling: false,
        wall_paint: "",
        position_on_building: "",
        conference_rooms: 0,
        space_id: 0
    },
    current_space_state: {
        id: 0,
        space_id: 0,
        lease_id: 0,
        space_state_date: '',
        current_images: [],
        damage: {
            damage_description: "",
            damage_image: []
        },
        tenant_id: 0
    },
    isLoading: false,
    message: "",
    error: null
    };

export const addListing = createAsyncThunk(
    'listing/addListing',
    async (listing: CreateSpace , {dispatch,rejectWithValue}) => {
        try{
            console.log(listing);
            const response = await dispatch(listingApi.endpoints.addListing.initiate(listing));
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
            const response = await dispatch(listingApi.endpoints.addListingFeature.initiate(feature));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createSpaceState = createAsyncThunk(
    'listing/createSpaceState',
    async (space_state: CreateSpaceState , {dispatch,rejectWithValue}) => {
        try{
            const response = await dispatch(listingApi.endpoints.createSpaceState.initiate(space_state));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getSpaceState =  createAsyncThunk(
    'listing/getSpaceState',
    async (id:number, {dispatch,rejectWithValue}) => {
        try{
            const response = await dispatch(listingApi.endpoints.getSpaceState.initiate(id));
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

export const getAllListingFeatures = createAsyncThunk(
    'listing/getAllListingFeatures',
    async(_, {dispatch,rejectWithValue}) => {
        try{
            const response = await dispatch(listingApi.endpoints.getAllListingFeatures.initiate(_));
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
            console.log(response.data);
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
            state.message = action.payload.message;
        });
        builder.addCase(addListing.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(addListingFeature.pending, (state, action: any) => {
            state.isLoading = true;
            
        });
        builder.addCase(addListingFeature.fulfilled, (state, action) => {
            state.isLoading = false;
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
            state.listings = action.payload;
           
        });
        builder.addCase(getAllListings.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string | null;
        });

        builder.addCase(getListingById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getListingById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listing = action.payload;
           
        });
        builder.addCase(getListingById.rejected,(state,action)=>{
            state.isLoading= false;
            state.error = action.payload as string | null;
        });
 
        //get listing feature
        builder.addCase(getAllListingFeatures.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(getAllListingFeatures.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.all_features = action.payload;
        });
        builder.addCase(getAllListingFeatures.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload as string | null;
        });


        builder.addCase(getListingFeatures.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(getListingFeatures.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.feature = action.payload;
            console.log(action.payload);
            // state.message = action.payload.message;
        });
        builder.addCase(getListingFeatures.rejected,(state,action)=>{
            state.isLoading=false;
            state.error = action.payload as string | null;
        });


        builder.addCase(createSpaceState.pending, (state) => {
            state.isLoading = true;
        }
        );
        builder.addCase(createSpaceState.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current_space_state = action.payload;
            state.message = action.payload.message;
        });
        builder.addCase(createSpaceState.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string| null;
        });

        builder.addCase(getSpaceState.pending, (state) => {
            state.isLoading = true;
        }
        );
        builder.addCase(getSpaceState.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current_space_state = action.payload;
            state.message = action.payload.message;
        });
        builder.addCase(getSpaceState.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string| null;
        });

    }
});

export default listingSlice.reducer;