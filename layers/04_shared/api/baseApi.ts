import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.milan-catalog.com/v1",
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
