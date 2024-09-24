import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApprovePayment, MakePayment, Payment } from "../../types/payment";
import { paymentApi } from "./paymentApi";






interface PaymentState {
   payments: Payment[],
   payment: Payment,
   isLoading: boolean,
   message: string| null,
   error: string | null
}

const initialState:PaymentState = {
  payment: {
    id: 0,
    invoice_id: "",
    invoice_image: "",
    status: "",
    due_date: "",
    paid_date: "",
    payment_price: 0,
    utility_price: 0,
    total_rent_price: 0,
    paid_by: "",
    space_id: 0,
    tenant_id: 0,
    lease_id: 0
    },
    isLoading: false,
    payments: [],
    message: "",
    error: null
    };

export const makePayment = createAsyncThunk(
    'payment/makePayment',
    async (payment: MakePayment, {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(paymentApi.endpoints.makePayment.initiate(payment));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const approvePayment = createAsyncThunk(
    'payment/approvePayment',
    async (payment: ApprovePayment, {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(paymentApi.endpoints.approvePayment.initiate(payment));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllPayments = createAsyncThunk(
    'payment/getAllPayments',
    async (_, {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(paymentApi.endpoints.getAllPayments.initiate(_));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getPaymentById = createAsyncThunk(
    'payment/getPaymentById',
    async (id: number, {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(paymentApi.endpoints.getPaymentById.initiate(id));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
)





const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makePayment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(makePayment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.payment = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(makePayment.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(approvePayment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(approvePayment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.payment = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(approvePayment.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(getAllPayments.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllPayments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.payments = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(getAllPayments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(getPaymentById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPaymentById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.payment = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(getPaymentById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        
    }
});

export default paymentSlice.reducer;