import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Business, BUSINESS_MOCKS } from './mocks/businessMocks';

export const businessApi = createApi({
  reducerPath: 'businessApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getBusinessList: builder.query<Business[], undefined>({
      queryFn: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: BUSINESS_MOCKS });
          }, 500);
        });
      },
    }),
  }),
});

export const { useGetBusinessListQuery } = businessApi;
