import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Business, BUSINESS_MOCKS } from './businessMocks';

export const businessApi = createApi({
  reducerPath: 'businessApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getBusinessList: builder.query<Business[], undefined>({
      queryFn: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            // Возвращаем мок-данные, имитируя успешный ответ сервера
            resolve({ data: BUSINESS_MOCKS });
          }, 500);
        });
      },
    }),
  }),
});

// Экспорт хука, который мы используем в компонентах
export const { useGetBusinessListQuery } = businessApi;
