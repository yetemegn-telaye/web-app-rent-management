import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RootState } from '../redux/store'; 

const baseApi = createApi({
    reducerPath: 'baseApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://188.245.149.154:3000',
        prepareHeaders: (headers, { getState }) => {
            // const token = (getState() as RootState).auth.token;
            const token = localStorage.getItem('token');  
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({}),  
});

export default baseApi;
