import { api } from '@/layers/03_entities/api/baseApi';
export interface Category {
  id: number;
  name: string;
}

const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<{ data: Category[] }, string | undefined>({
      query: (lang = 'en') => `/categories?lang=${lang}`,
      providesTags: ['Category'],
      keepUnusedDataFor: 10 * 60,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
