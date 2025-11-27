import { api } from '@/layers/03_entities/api/baseApi';
import {
  Business,
  BUSINESS_MOCKS,
} from '../../04_shared/api/mocks/businessMocks';
import { LanguageCode } from '@/layers/04_shared/configs/settings';

interface CompanyParams {
  id: number | string;
  lang: LanguageCode;
}

export const businessApi = api.injectEndpoints({
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

    getCompanyDetails: builder.query<Business, CompanyParams>({
      query: ({ id, lang }: CompanyParams) => `companies/${id}?lang=${lang}`,
      transformResponse: (response: { data: Business }) => response.data,
      providesTags: ['Business'],
    }),
  }),
});

// --- Экспорт хуков и функций для SSR ---
export const { useGetBusinessListQuery, useGetCompanyDetailsQuery } =
  businessApi;

// 🚨 Экспорт initiate для использования в Server Components (SSR)
export const { getCompanyDetails } = businessApi.endpoints;
