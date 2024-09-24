import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Building } from "../../types/building";
import { BuildingManager } from "../../types/building-manager";
import { buildingApi } from "./buildingApi";


type BuildingState = {
    building: Building,
    isLoading: boolean,
    error: string | null,
    message: string | null
    };

const initialState: BuildingState = {
    building: {
        id: 0,
        total_spaces: 0,
        available_spaces: 0,
        occupied_spaced: 0,
        total_size: 0,
        tot_num_floors: 0,
        total_parking_space: 0,
        manager_id: 0,
        elevator: false
    },
    isLoading: false,
    error: null,
    message: null
    };
 
    export const getBuildingById = createAsyncThunk(
        'building/getBuildingById',
        async (id: number, {dispatch,rejectWithValue}) => {
            try{ 
                const response = await dispatch(buildingApi.endpoints.getBuildingById.initiate(id));
                return response.data;
            } catch (error:any) {
                return rejectWithValue(error.response.data);
            }
        }
    );

    export const buildingSlice = createSlice({
        name: 'building',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(getBuildingById.pending, (state) => {
                state.isLoading = true;
            });
            builder.addCase(getBuildingById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.building = action.payload.data;
            });
            builder.addCase(getBuildingById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
        }
    });