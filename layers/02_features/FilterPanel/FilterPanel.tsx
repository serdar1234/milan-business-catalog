'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Facets } from '@/layers/04_shared/types/types';
import { CategoryFilter } from './CategoryFilter';
import { RatingFilter } from './RatingFilter';

interface FilterPanelProps {
  meta?: {
    pagination: {
      page: number;
      per_page: number;
      total_pages: number;
      total_count: number;
    };
    source: string;
    facets?: Facets;
  } | null;
  /**
   * optional callback invoked when a filter checkbox changes;
   * receives the key and array of selected values.  useful for
   * parents that want to perform their own fetch instead of
   * solely relying on URL navigation.
   */
  onFilterChange?: (key: string, values: string[]) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  meta,
  onFilterChange,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = (key: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
      const combinedValue = value.filter((v) => v).join(',');
      if (combinedValue) {
        params.set(key, combinedValue);
      } else {
        params.delete(key);
      }
    } else if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Convert rating filter to rating_min parameter for API
    if (key === 'rating') {
      if (value) {
        // Extract numeric value from the rating filter (e.g., '4.5+' -> '4.5')
        let ratingValue = '';
        if (typeof value === 'string') {
          ratingValue = value.replace('+', '');
        } else if (Array.isArray(value) && value.length > 0) {
          // For arrays, use the lowest rating (assuming the UI allows multiple selections)
          // Sort by rating value to get the lowest one
          const sortedRatings = value
            .map((v) => v.replace('+', ''))
            .sort((a, b) => parseFloat(a) - parseFloat(b));
          ratingValue = sortedRatings[0];
        }
        if (ratingValue) {
          params.set('rating_min', ratingValue);
        } else {
          params.delete('rating_min');
        }
      } else {
        params.delete('rating_min');
      }
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCheckboxChange = (
    key: string,
    value: string,
    isChecked: boolean,
  ) => {
    let currentValues =
      searchParams
        .get(key)
        ?.split(',')
        .filter((v) => v) || [];

    if (isChecked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      currentValues = currentValues.filter((v) => v !== value);
    }

    updateSearchParams(key, currentValues);

    if (onFilterChange) {
      onFilterChange(key, currentValues);
    }
  };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    searchParams.forEach((_, key) => {
      if (key !== 'q' && key !== 'view') {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Box
      sx={{
        p: 2,
        pb: '2rem',
        width: '100%',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          Filters
        </Typography>
        <Button onClick={handleClearAll} size="small" color="brandPin">
          Clear all
        </Button>
      </Box>

      <RatingFilter onCheckboxChange={handleCheckboxChange} />

      {meta?.facets?.category_id && meta.facets.category_id.length > 0 && (
        <CategoryFilter meta={meta} onCheckboxChange={handleCheckboxChange} />
      )}
    </Box>
  );
};
