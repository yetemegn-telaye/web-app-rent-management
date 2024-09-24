import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApproveMaintenanceRequest, CreateMaintenanceRequest, Maintenance } from "../../types/maintenance-request";
import { maintenanceApi } from "./maintenanceApi";


interface MaintenanceRequestState {
   all_maintenance: Maintenance[],
   maintenance: Maintenance,
   isLoading: boolean,
   message: string| null,
   error: string | null
}

const initialState:MaintenanceRequestState = {
    maintenance: {
        id: 0,
        pictures:[],
        priority: '',
        description: '',
        maintenance_type: '',
        status: '',
        user_id: 0,
        space_id: 0
    },
    isLoading: false,
    all_maintenance: [],
    message: "",
    error: null
    };

export const createMaintenanceRequest = createAsyncThunk(
    'maintenance/createMaintenanceRequest',
    async (maintenance: CreateMaintenanceRequest, {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(maintenanceApi.endpoints.createMaintenanceRequest.initiate(maintenance));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const approveMaintenance = createAsyncThunk(
    'maintenance/approveMaintenance',
    async (maintenanceRequest: ApproveMaintenanceRequest, {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(maintenanceApi.endpoints.approveMaintenance.initiate(maintenanceRequest));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllMaintenance = createAsyncThunk(
    'maintenance/getAllMaintenance',
    async (_, {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(maintenanceApi.endpoints.getAllMaintenance.initiate(_));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getMaintenaceById = createAsyncThunk(
    'maintenance/getMaintenaceById',
    async (id: number, {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(maintenanceApi.endpoints.getMaintenanceById.initiate(id));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
)





const maintenanceSlice = createSlice({
    name: 'maintenance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createMaintenanceRequest.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createMaintenanceRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.maintenance = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(createMaintenanceRequest.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(approveMaintenance.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(approveMaintenance.fulfilled, (state, action) => {
            state.isLoading = false;
            state.maintenance = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(approveMaintenance.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(getAllMaintenance.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllMaintenance.fulfilled, (state, action) => {
            state.isLoading = false;
            state.all_maintenance = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(getAllMaintenance.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(getMaintenaceById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMaintenaceById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.maintenance = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(getMaintenaceById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        
    }
});

export default maintenanceSlice.reducer;