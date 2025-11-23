import { api } from '@/layers/03_entities/api/baseApi';
import {
  Business,
  BUSINESS_MOCKS,
} from '../../04_shared/api/mocks/businessMocks';

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
  }),
});

export const { useGetBusinessListQuery } = businessApi;
