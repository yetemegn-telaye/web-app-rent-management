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
            state.tenant = action.payload.lease;
            state.message = action.payload.message;
        });
        builder.addCase(createTenant.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        
    }
});

export default tenantSlice.reducer;