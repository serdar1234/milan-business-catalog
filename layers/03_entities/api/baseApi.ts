import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.milanplaces.com/api/v1',
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
