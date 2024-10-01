import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateLease, Lease } from "../../types/lease";
import { CreateTenant, Tenant } from "../../types/tenant";
import { tenantApi } from "./tenantApi";





interface TenantState {
   tenants: Tenant[],
   tenant: Tenant,
   isLoading: boolean,
   message: string| null,
   error: string | null
}

const initialState:TenantState = {
    tenant: {
        id: 0,
        first_name: '',
        middle_name: '',
        last_name: '',
        company_name: '',
        industry: '',
        national_id_image: '',
        gender: '',
        phone_number: '',
        email: '',
        business_license_image: '',
        lease_id: 0
    },
    isLoading: false,
    tenants: [],
    message: "",
    error: null
    };

export const createTenant = createAsyncThunk(
    'tenant/createTenant',
    async (tenant: CreateTenant , {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(tenantApi.endpoints.createTenant.initiate(tenant));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllTenants = createAsyncThunk(
    'tenant/getAllTenants',
    async (_ , {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(tenantApi.endpoints.getAllTenants.initiate(_));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getTenantById = createAsyncThunk(
    'tenant/getTenantById',
    async (id: number , {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(tenantApi.endpoints.getTenantById.initiate(id));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);


const tenantSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTenant.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createTenant.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tenant = action.payload.data;
           
        });
        builder.addCase(createTenant.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });



        builder.addCase(getAllTenants.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllTenants.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tenants = action.payload;
        
        });
        builder.addCase(getAllTenants.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        

        builder.addCase(getTenantById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTenantById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tenant = action.payload.data;
            
        });
        builder.addCase(getTenantById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    }
});

export default tenantSlice.reducer;