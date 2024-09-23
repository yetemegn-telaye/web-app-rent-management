import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateLease, Lease } from "../../types/lease";
import { agreementApi } from "./agreementApi";




interface AgreementState {
   agreements: Lease[],
   agreement: Lease,
   isLoading: boolean,
   message: string| null,
   error: string | null
}

const initialState:AgreementState = {
    agreement: {
        id: 0,
        lease_start_date: "",
        lease_end_date: "",
        lease_update_date: "",
        rent_price: 0,
        rent_payment_date: "",
        rent_payment_period: "",
        penalty_amount: 0,
        penalty_waiting_period: 0,
        lease_image: "",
        deposit_slip_image: ""
    },
    isLoading: false,
    agreements: [],
    message: "",
    error: null
    };

export const createAgreement = createAsyncThunk(
    'agreement/createAgreement',
    async (agreement: CreateLease , {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(agreementApi.endpoints.createAgreement.initiate(agreement));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);



const agreementSlice = createSlice({
    name: 'agreement',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAgreement.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createAgreement.fulfilled, (state, action) => {
            state.isLoading = false;
            state.agreement = action.payload.lease;
            state.message = action.payload.message;
        });
        builder.addCase(createAgreement.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        
    }
});

export default agreementSlice.reducer;