import { api } from '@/layers/03_entities/api/baseApi';
import { type LanguageCode } from '@/layers/04_shared/configs/settings';

export interface AutocompleteResult {
  name: string;
  city: string;
  country: string;
  id: number;
}

interface AutocompleteApiResponse {
  data: AutocompleteResult[];
}

interface AutocompleteParams {
  q: string;
  limit: number;
  lang: LanguageCode;
}

export const searchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAutocompleteSuggestions: builder.query<
      AutocompleteResult[],
      AutocompleteParams
    >({
      query: ({ q, limit, lang }) => ({
        url: `/companies/autocomplete?q=${q}&limit=${limit}&lang=${lang}`,
        method: 'GET',
      }),
      transformResponse: (response: AutocompleteApiResponse) => {
        return response.data;
      },
      providesTags: [{ type: 'Autocomplete', id: 'LIST' }],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetAutocompleteSuggestionsQuery } = searchApi;
