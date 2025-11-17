'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { FilterList as FilterIcon } from '@mui/icons-material';

import {
  QUICK_FILTERS,
  SORT_OPTIONS,
} from '@/layers/04_shared/api/mocks/filterMocks';
import type { ViewType } from '@/layers/02_features/SearchHeaderVersions';
import styles from './SearchHeaderMobile.module.css';

interface SearchHeaderMobileProps {
  totalResults: number;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onAllFilterClick: () => void;
  pageTitle: string;
}

export const SearchHeaderMobile: React.FC<SearchHeaderMobileProps> = ({
  totalResults,
  currentView,
  onViewChange,
  onAllFilterClick,
  pageTitle,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentSort = searchParams.get('sort') || 'distance';

  const handleViewChange = (
    event: React.ChangeEvent<HTMLElement>,
    checked: boolean,
  ) => {
    const newView = checked ? 'map' : 'list';
    onViewChange(newView);
    updateSearchParams('view', newView);
  };

  const handleSortClick = (sortByValue: string) => {
    updateSearchParams('sort', sortByValue);
  };

  const handleQuickFilterClick = (key: string, value: string) => {
    const isCurrentlyActive = searchParams.get(key) === value;
    const newValue = isCurrentlyActive ? null : value;
    updateSearchParams(key, newValue);
  };

  return (
    <Box
      sx={{
        pt: 2,
        pb: 1,
      }}
    >
      <Box sx={{ maxWidth: 'lg', margin: '0 auto', px: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {pageTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {totalResults} places found near you
            </Typography>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={currentView === 'map'}
                onChange={handleViewChange}
              />
            }
            label="Map View"
          />
        </Box>

        <Box
          className={styles.quickFiltersContainer}
          sx={{ '& > *': { mr: 1, flexShrink: 0 } }}
        >
          <Button
            variant="contained"
            color="brandPin"
            startIcon={<FilterIcon />}
            onClick={onAllFilterClick}
            sx={{
              borderRadius: '25px',
              span: { margin: { xs: 0, sm: '0 8px 0 -4px' } },
            }}
          >
            <Typography variant="body2" display={{ xs: 'none', sm: 'block' }}>
              All Filters
            </Typography>
          </Button>

          {QUICK_FILTERS.map((filter) => {
            const isActive =
              searchParams.get(filter.paramKey) === filter.paramValue;

            return (
              <Button
                key={'quick_filter_' + filter.label}
                variant={isActive ? 'contained' : 'outlined'}
                onClick={() =>
                  handleQuickFilterClick(filter.paramKey, filter.paramValue)
                }
                startIcon={
                  <filter.icon
                    sx={{ color: isActive ? 'white' : 'text.primary' }}
                  />
                }
                className={styles.quickFilterButton}
                sx={{
                  borderRadius: '25px',
                  ml: 1,
                  span: { margin: { xs: 0, sm: '0 8px 0 -4px' } },
                  bgcolor: isActive ? 'brandPin.main' : 'background.paper',
                  color: isActive ? 'white' : 'text.primary',
                  borderColor: isActive ? 'brandPin.main' : 'grey.400',
                  '&:hover': {
                    bgcolor: isActive ? 'brandPin.dark' : 'background.paper',
                    borderColor: isActive ? 'brandPin.dark' : 'text.primary',
                  },
                }}
              >
                <Typography
                  variant="body2"
                  display={{ xs: isActive ? 'block' : 'none', sm: 'block' }}
                >
                  {filter.label}
                </Typography>
              </Button>
            );
          })}
        </Box>

        <Box
          display="flex"
          alignItems="center"
          pt={1}
          sx={{ borderTop: '1px solid var(--color-border-grey)', mt: 1 }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            mr={2}
            display={{ xs: 'none', sm: 'block' }}
          >
            Sort by:
          </Typography>
          {SORT_OPTIONS.map((option) => (
            <Button
              key={'sort_by_' + option.value}
              size="small"
              onClick={() => handleSortClick(option.value)}
              className={styles.sortButton}
              sx={{
                textTransform: 'capitalize',
                color:
                  option.value === currentSort
                    ? 'primary.main'
                    : 'text.secondary',
                fontWeight: option.value === currentSort ? 'bold' : 'normal',
                px: 1,
              }}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
