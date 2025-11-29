import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_URL = 'https://api.milanplaces.com/api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Category', 'Business', 'User', 'Autocomplete', 'Search'],
  keepUnusedDataFor: 60 * 60,
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: false,
  refetchOnFocus: false,
  endpoints: () => ({}),
});
