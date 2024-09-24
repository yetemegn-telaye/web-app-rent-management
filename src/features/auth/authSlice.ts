import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/authentication";
import { authApi, useLoginUserMutation, useLogoutUserMutation } from "./authApi";


interface AuthState {
   user: User,
   isLoading: boolean,
   token: string | null,
   message: string| null,
   error: string | null
}

const initialState:AuthState = {
    user: {
        id: 0,
        name: "",
        email: "",
        email_verified_at: "",
        created_at: "",
        updated_at: "",
        role: "",
        location_id: "",
        // id: 0,
        // firstName: "",
        // lastName: "",
        // email: "",
        // password: "",
        // role: "",
    },
    isLoading: false,
    token: null,
    message: "",
    error: null
    };

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials:{email:string,password:string}, {dispatch,rejectWithValue}) => {
        try{
            // const [loginUserMutation] = useLoginUserMutation();
            // const response = await loginUserMutation(credentials).unwrap();
            const response = await dispatch(authApi.endpoints.loginUser.initiate(credentials));
            console.log(response);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (token: string, {dispatch,rejectWithValue}) => {
        try{
            // const [logoutUserMutation] = useLogoutUserMutation();
            // const response = await logoutUserMutation(token).unwrap();
            const response = await dispatch(authApi.endpoints.logoutUser.initiate(token));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

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
            state.user = action.payload.data;
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