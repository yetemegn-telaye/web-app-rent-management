import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/authentication";
import { authApi } from "./authApi";


interface AuthState {
  user: User,
  isLoading: boolean,
  token: string | null,
  isAuthenticated: boolean,
  role: string | null,
  message: string | null,
  error: string | null
}

// Initialize state from localStorage
const userFromStorage = localStorage.getItem("user");
const tokenFromStorage = localStorage.getItem("token");
const roleFromStorage = userFromStorage ? JSON.parse(userFromStorage).role : null;

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : {
    id: 0,
    name: "",
    email: "",
    email_verified_at: "",
    created_at: "",
    updated_at: "",
    role: "",
    location_id: ""
  },
  isLoading: false,
  isAuthenticated: !!tokenFromStorage, // If token exists, assume user is authenticated
  role: roleFromStorage || "",
  token: tokenFromStorage || null,
  message: null,
  error: null
};

// Login action using createAsyncThunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string, password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(authApi.endpoints.loginUser.initiate(credentials));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Logout action using createAsyncThunk
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (token: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(authApi.endpoints.logoutUser.initiate(token));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      window.localStorage.setItem("token", action.payload.token);
      window.localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.user = action.payload.user;
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
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      state.user = initialState.user;
      state.isAuthenticated = false;
      state.role = '';
      state.token = null;
      state.message = action.payload.message;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string | null;
    });
  }
});

export default authSlice.reducer;
