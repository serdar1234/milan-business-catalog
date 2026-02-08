'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import { FilterGroup } from '@/layers/02_features/FilterPanel/FilterGroup';

import { RATING_OPTIONS } from '@/layers/04_shared/api/mocks/filterMocks';

interface FilterPanelProps {
  meta?: {
    pagination: {
      page: number;
      per_page: number;
      total_pages: number;
      total_count: number;
    };
    source: string;
    facets?: {
      city: { key: string; count: number }[];
      category_id: { key: string; count: number }[];
      country: { key: string; count: number }[];
    };
  } | null;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ meta }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentRating = searchParams.get('rating') || '';
  const currentCategoryId = searchParams.get('category_id') || '';

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

      <FilterGroup title="Rating">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {RATING_OPTIONS.map((option) => (
            <MuiFormControlLabel
              key={'rating_' + option.value}
              control={
                <Checkbox
                  size="small"
                  checked={currentRating.includes(option.value)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      'rating',
                      option.value,
                      e.target.checked,
                    )
                  }
                />
              }
              label={
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Typography variant="body2">{option.label}</Typography>
                  <Rating
                    name={`rating-${option.value}`}
                    defaultValue={parseFloat(option.value)}
                    precision={0.5}
                    readOnly
                    sx={{
                      color: 'ratingGold.main',
                      fontSize: '1.25rem',
                      ml: 1,
                    }}
                  />
                </Box>
              }
            />
          ))}
        </Box>
      </FilterGroup>

      {/* Category filter */}
      {meta?.facets?.category_id && meta.facets.category_id.length > 0 && (
        <FilterGroup title="Categories">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {meta.facets.category_id.map((category) => {
              const isChecked = currentCategoryId
                .split(',')
                .includes(category.key);
              return (
                <MuiFormControlLabel
                  key={'category_' + category.key}
                  control={
                    <Checkbox
                      size="small"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(
                          'category_id',
                          category.key,
                          e.target.checked,
                        )
                      }
                    />
                  }
                  label={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                    >
                      <Typography variant="body2">
                        {category.key} ({category.count})
                      </Typography>
                    </Box>
                  }
                />
              );
            })}
          </Box>
        </FilterGroup>
      )}
    </Box>
  );
};
