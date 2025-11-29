import { api } from '@/layers/03_entities/api/baseApi';
export interface Category {
  id: number;
  slug: string;
  name: string;
  companies_count: number;
}

const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], string | undefined>({
      query: (lang = 'en') => `/categories?lang=${lang}`,
      transformResponse: (response: { data: Category[] }) => response.data,
      providesTags: ['Category'],
      keepUnusedDataFor: 10 * 60,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
