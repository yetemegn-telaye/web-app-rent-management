import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://jgxbnetdrjzhvqobpmwm.supabase.co/rest/v1'; // <-- Supabase REST

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpneGJuZXRkcmp6aHZxb2JwbXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1ODk0MjIsImV4cCI6MjA2ODE2NTQyMn0.3T_HO4SwacJsjqf9Fol3OU_qgvYxNj5LECCsZ69EITE');
      headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpneGJuZXRkcmp6aHZxb2JwbXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1ODk0MjIsImV4cCI6MjA2ODE2NTQyMn0.3T_HO4SwacJsjqf9Fol3OU_qgvYxNj5LECCsZ69EITE`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}), // add tenants, spaces, etc. here
});

export default baseApi;
