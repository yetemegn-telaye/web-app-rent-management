import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApprovePayment, MakePayment, IPayment } from "../../types/payment";
import { paymentApi } from "./paymentApi";






interface PaymentState {
   payments: IPayment[],
   payment: IPayment,
   total_payment_all_space: [],
   total_payment_by_space: [],
   isLoading: boolean,
   message: string| null,
   error: string | null
}

const initialState:PaymentState = {
  payment: {
    id: 0,
    invoice_id: 0,
    invoice_image: [],
    status: "",
    due_date: "",
    paid_date: "",
    payment_price: 0,
    utility_price: 0,
    total_rent_price: 0,
    paid_by: 0,
    space_id: 0,
    tenant_id: 0,
    lease_id: 0
    },
    isLoading: false,
    total_payment_all_space: [],
    total_payment_by_space: [],
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

export const getTotalPaymentAllSpace = createAsyncThunk(
    'payment/getTotalPaymentAllSpace',
    async (_, {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(paymentApi.endpoints.getTotalPaymentAllSpace.initiate(_));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getTotalPaymentBySpace = createAsyncThunk(
    'payment/getTotalPaymentBySpace',
    async (space_id: number, {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(paymentApi.endpoints.getTotalPaymentBySpace.initiate(space_id));
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

export const getPaymentByTenant = createAsyncThunk(
    'payment/getPaymentByTenant',
    async (tenant_id: number, {dispatch,rejectWithValue}) => {
        try{ 
            const response = await dispatch(paymentApi.endpoints.getPaymentByTenant.initiate(tenant_id));
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);




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
            state.payments = action.payload;
            console.log(action.payload);
     
        });
        builder.addCase(getAllPayments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });



        builder.addCase(getTotalPaymentAllSpace.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTotalPaymentAllSpace.fulfilled, (state, action) => {
            state.isLoading = false;
            state.total_payment_all_space = action.payload;
        });
        builder.addCase(getTotalPaymentAllSpace.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(getTotalPaymentBySpace.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTotalPaymentBySpace.fulfilled, (state, action) => {
            state.isLoading = false;
            state.total_payment_by_space = action.payload;
            console.log(action.payload);
        });
        builder.addCase(getTotalPaymentBySpace.rejected, (state, action) => {
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


        builder.addCase(getPaymentByTenant.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPaymentByTenant.fulfilled, (state, action) => {
            state.isLoading = false;
            state.payments = action.payload;
        });
        builder.addCase(getPaymentByTenant.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        
    }
});

export default paymentSlice.reducer;