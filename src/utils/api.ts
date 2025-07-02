import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { auth } from '../firebase';

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rent.jasmineaddis.com',
    prepareHeaders: async (headers) => {
      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken(); // Firebase JWT
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}), // define your endpoints later
});

export default baseApi;
