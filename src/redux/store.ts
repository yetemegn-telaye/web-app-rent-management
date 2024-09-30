import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import listingReducer from "../features/listings/listingSlice";
import agreementReducer from "../features/agreement/agreementSlice";
import tenantReducer from "../features/tenant/tenantSlice";
import paymentReducer from "../features/payment/paymentSlice";
import maintenanceReducer from "../features/maintenance/maintenanceSlice";
import baseApi from "../utils/api";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import sessionStorage from "redux-persist/es/storage/session";
import { persistReducer, persistStore } from "redux-persist";

// const persistConfig = {
//     key: 'root',
//     storage: sessionStorage,
//     whitelist: ['auth']
// }

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

 const store = configureStore({
    reducer:{
        auth: authReducer,
        listing: listingReducer,
        agreement: agreementReducer,
        tenant: tenantReducer,
        payment: paymentReducer,
        maintenance: maintenanceReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:
            {
                ignoredActions: ['persist/PERSIST'],
            },
        }),});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const persistor = persistStore(store);
export default store;