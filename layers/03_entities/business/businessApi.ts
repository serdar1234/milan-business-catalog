import { api } from '@/layers/03_entities/api/baseApi';
import { Business } from '../../04_shared/api/mocks/businessMocks';
import { LanguageCode } from '@/layers/04_shared/configs/settings';

interface BusinessListParams {
  lang?: LanguageCode;
  page?: number;
  per_page?: number;
  category_id?: number;
  city?: string;
  country?: string;
  rating_min?: number;
  sort?: 'rating' | 'created_at';
}

interface CompanyParams {
  id: number | string;
  lang: LanguageCode;
}

export const businessApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessList: builder.query<Business[], BusinessListParams | undefined>({
      query: (params) => ({
        url: 'companies',
        params,
      }),
      transformResponse: (response: { data: Business[] }) => response.data,
      providesTags: ['Business'],
    }),

    getCompanyDetails: builder.query<Business, CompanyParams>({
      query: ({ id, lang }: CompanyParams) => `companies/${id}?lang=${lang}`,
      transformResponse: (response: { data: Business }) => response.data,
      providesTags: ['Business'],
    }),
  }),
});

export const { useGetBusinessListQuery, useGetCompanyDetailsQuery } =
  businessApi;
