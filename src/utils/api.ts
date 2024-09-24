import { BaseQueryFn, createApi, EndpointBuilder, EndpointDefinitions, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta, RootState } from '@reduxjs/toolkit/query/react';
import { get } from 'http';

const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://top2.natnaelghirma.com/api',
        prepareHeaders: (headers,{getState}) => {
            // const token = (getState() as RootState>).auth.token;
          const token = localStorage.getItem('token');
            if(token){
                headers.set('authorization',`Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: () => ({}),
});

export default baseApi;