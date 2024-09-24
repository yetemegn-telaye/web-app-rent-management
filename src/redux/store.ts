import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import listingReducer from "../features/listings/listingSlice";
import agreementReducer from "../features/agreement/agreementSlice";
import tenantReducer from "../features/tenant/tenantSlice";
import paymentReducer from "../features/payment/paymentSlice";
import maintenanceReducer from "../features/maintenance/maintenanceSlice";
import baseApi from "../utils/api";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        listing: listingReducer,
        agreement: agreementReducer,
        tenant: tenantReducer,
        payment: paymentReducer,
        maintenance: maintenanceReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;