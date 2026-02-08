import { Photo } from '@/layers/01_widgets/PhotoGallery/ui/PhotoGallery';
import { Dispatch, SetStateAction } from 'react';

interface Business {
  id: number;
  slug: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  website: string;
  email: string;
  coordinates: { lat: number; lon: number };
  average_rating: number;
  approved_reviews_count: number;
  ratings_breakdown: {
    stars: number;
    count: number;
    percentage: number;
  }[];
  category: Category;
  images: Photo[];
  created_at: string;
  updated_at: string;

  isFavorite?: boolean;
  distance?: string;
  isOpen?: boolean;
  tag?: {
    label: string;
    color: string;
  };
}

interface Pagination {
  page: number;
  per_page: number;
  total_pages: number;
  total_count: number;
}

interface SearchResults {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  businessList: Business[];
  meta?: Meta | null;
  isLoading: boolean;
  isError: boolean;
}

interface Meta {
  pagination: Pagination;
  source: string;
  facets?: Facets;
}

interface Facets {
  city: FacetData[];
  category_id: FacetData[];
  country: FacetData[];
}

interface FacetData {
  key: string;
  count: number;
}

interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

export interface Insight {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
  company: Company;
}
export interface Company {
  id: number;
  slug: string;
  name: string;
}

interface Review {
  id: number;
  name: string;
  email: string;
  rating: number;
  comment: string;
  approved: boolean;
  created_at: string;
}

interface ReviewResponse {
  data: Review[];
  meta: Meta;
}

export type {
  Business,
  Pagination,
  SearchResults,
  Meta,
  ReviewFormData,
  Review,
  ReviewResponse,
};

export interface ReviewStats {
  average_rating: number;
  approved_reviews_count: number;
  ratings_breakdown: {
    stars: number;
    count: number;
    percentage: number;
  }[];
}

export interface AutocompleteResult {
  name: string;
  city: string;
  slug: string;
  country: string;
  id: number;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  companies_count: number;
}
