import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://65.109.4.45/api/v1',
    prepareHeaders: (headers) => {
      // Здесь можно добавить логику для авторизации, например, токен
      // const token = localStorage.getItem('authToken');
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [],
});
