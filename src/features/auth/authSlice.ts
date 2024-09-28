import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BuildingManagerUser, TenantUser } from "../../types/authentication";
import { authApi } from "./authApi";

interface AuthState {
  tenantUser: TenantUser;
  managerUser: BuildingManagerUser;
  isLoading: boolean;
  token: string | null;
  isAuthenticated: boolean;
  role: string | null;
  message: string | null;
  error: string | null;
}

const initialState: AuthState = {
  tenantUser: {
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
    lease_id: 0,
    role: '',
  },
  managerUser:{
    id: 0,
    first_name: '',
    middle_name: '',
    last_name: '',
    national_id: '',
    city: '',
    gender: '',
    street_address: '',
    phone_number: '',
    email: '',
    role: ''
  },
  isLoading: false,
  isAuthenticated: false,
  role: null,
  token: null,
  message: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(authApi.endpoints.loginUser.initiate(credentials));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (token: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(authApi.endpoints.logoutUser.initiate(token));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      if(action.payload.user.role === 'tenant'){
      state.tenantUser = action.payload.user;
      }
      else if(action.payload.user.role === 'building_manager'){
        state.managerUser = action.payload.user;
      }
      state.isAuthenticated = true;
      state.role = action.payload.user.role;
      state.token = action.payload.token;
      state.message = action.payload.message;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      if(state.role==='tenant'){
        state.tenantUser = initialState.tenantUser;
      }
      else if(state.role==='building_manager'){
        state.managerUser = initialState.managerUser;
      }
      state.isAuthenticated = false;
      state.role = null;
      state.token = null;
      state.message = "Logged out successfully";
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string | null;
    });
  },
});

export default authSlice.reducer;
