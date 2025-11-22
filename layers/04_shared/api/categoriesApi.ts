import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Category {
  id: number;
  name: string;
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.milanplaces.com/api/v1' }),
  endpoints: (builder) => ({
    getCategories: builder.query<{ data: Category[] }, string | undefined>({
      query: (lang = 'en') => `/categories?lang=${lang}`,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
