import { api } from '@/layers/03_entities/api/baseApi';
import { Business, Meta, ReviewFormData } from '@/layers/04_shared/types/types';
import type { LanguageCode } from '@/layers/04_shared/configs/settings';

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

interface SubmitReviewArgs {
  slug: string;
  formData: ReviewFormData;
  lang: LanguageCode;
}

interface ReviewPayload {
  review: {
    name: string;
    email: string;
    rating: number;
    comment_translations: { [key in LanguageCode]?: string };
  };
}

interface ReviewResponse {
  id: number;
  status: 'pending' | 'approved';
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

    getFullBusinessList: builder.query<
      { data: Business[]; meta: Meta },
      BusinessListParams | undefined
    >({
      query: (params) => ({
        url: 'companies',
        params,
      }),
      providesTags: ['Business'],
    }),

    getCompanyDetails: builder.query<Business, CompanyParams>({
      query: ({ id, lang }: CompanyParams) => `companies/${id}?lang=${lang}`,
      transformResponse: (response: { data: Business }) => response.data,
      providesTags: ['Business'],
    }),

    submitReview: builder.mutation<ReviewResponse, SubmitReviewArgs>({
      query: ({ slug, formData, lang }) => {
        const body: ReviewPayload = {
          review: {
            name: formData.name,
            email: formData.email,
            rating: formData.rating,
            comment_translations: {
              [lang]: formData.comment,
            },
          },
        };

        return {
          url: `companies/${slug}/reviews`,
          method: 'POST',
          body,
          headers: {
            'Accept-Language': lang,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: (result, error, { slug }) => [
        { type: 'Business', id: slug },
      ],
    }),
  }),
});

export const {
  useGetBusinessListQuery,
  useGetFullBusinessListQuery,
  useGetCompanyDetailsQuery,
  useSubmitReviewMutation,
} = businessApi;
