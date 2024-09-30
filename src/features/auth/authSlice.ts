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
  tenantUser: JSON.parse(window.localStorage.getItem('userInfo') || '{}'),
  managerUser: JSON.parse(window.localStorage.getItem('userInfo') || '{}'),
  isLoading: false,
  isAuthenticated: Boolean(window.localStorage.getItem('token')),
  role: window.localStorage.getItem('role'),
  token: window.localStorage.getItem('token'),
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

export const loginTenant = createAsyncThunk(
  "auth/loginTenant",
  async (credentials: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(authApi.endpoints.loginTenant.initiate(credentials));
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
      console.log(state.isLoading);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.token = action.payload.access_token;
      state.managerUser = action.payload;
      window.localStorage.setItem('token', action.payload.access_token); 
      window.localStorage.setItem('role', action.payload.role); 
      window.localStorage.setItem('userInfo', JSON.stringify(action.payload)); 
      state.message = action.payload.message;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });



    builder.addCase(loginTenant.pending, (state) => {
      state.isLoading = true;
      console.log(state.isLoading);
    });
    builder.addCase(loginTenant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.token = action.payload.access_token;
      state.tenantUser = action.payload;
      window.localStorage.setItem('token', action.payload.access_token); 
      window.localStorage.setItem('role', action.payload.role); 
      window.localStorage.setItem('userInfo', JSON.stringify(action.payload)); 
      state.message = action.payload.message;
    });
    builder.addCase(loginTenant.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });


    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.role = null;
      state.token = null;
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('role');
      window.localStorage.removeItem('userInfo');
      state.tenantUser = initialState.tenantUser;
      state.managerUser = initialState.managerUser;
      state.message = "Logged out successfully";
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string | null;
    });
  },
});

export default authSlice.reducer;
