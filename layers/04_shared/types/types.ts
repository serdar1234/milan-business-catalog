import { Photo } from '@/layers/01_widgets/PhotoGallery/ui/PhotoGallery';
import { Category } from '@/layers/03_entities/category/categoryApi';
import { Dispatch, SetStateAction } from 'react';

export interface Business {
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

export interface SearchResults {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  businessList: Business[];
  meta?: Meta;
  isLoading: boolean;
  isError: boolean;
}

export interface Meta {
  pagination: Pagination;
  source: string;
}
