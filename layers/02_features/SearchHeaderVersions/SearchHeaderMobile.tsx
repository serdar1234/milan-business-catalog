'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  FilterList as FilterIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  Place as PlaceIcon,
} from '@mui/icons-material';
import styles from './SearchHeaderMobile.module.css';

import type { ViewType } from '@/layers/02_features/SearchHeaderVersions';
import { FormControlLabel, Switch } from '@mui/material';

interface SearchHeaderMobileProps {
  totalResults: number;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onFilterClick: () => void;
  pageTitle: string;
}

interface QuickFilter {
  label: string;
  icon: React.ElementType;
}

const QUICK_FILTERS: QuickFilter[] = [
  { label: 'Open Now', icon: TimeIcon },
  { label: '4.5+ Rating', icon: StarIcon },
  { label: 'Near Me', icon: PlaceIcon },
];

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: 'distance', label: 'Distance' },
  { value: 'popular', label: 'Popular' },
  { value: 'price', label: 'Price' },
  { value: 'rating', label: 'Rating' },
];

export const SearchHeaderMobile: React.FC<SearchHeaderMobileProps> = ({
  totalResults,
  currentView,
  onViewChange,
  onFilterClick,
  pageTitle,
}) => {
  const handleViewChange = (
    event: React.ChangeEvent<HTMLElement>,
    checked: boolean,
  ) => {
    if (checked) {
      onViewChange('map');
    } else {
      onViewChange('list');
    }
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
            label="Switch to Map View"
          />
        </Box>

        {/* 2. Rounded buttons */}
        <Box
          className={styles.quickFiltersContainer}
          sx={{ '& > *': { mr: 1, flexShrink: 0 } }}
        >
          <Button
            variant="contained"
            color="brandPin"
            startIcon={<FilterIcon />}
            onClick={onFilterClick}
            sx={{
              borderRadius: '25px',
              span: { margin: { xs: 0, sm: '0 8px 0 -4px' } },
            }}
          >
            <Typography variant="body2" display={{ xs: 'none', sm: 'block' }}>
              All Filters
            </Typography>
          </Button>

          {QUICK_FILTERS.map((filter) => (
            <Button
              key={filter.label}
              variant="outlined"
              startIcon={<filter.icon sx={{ color: 'text.primary' }} />}
              className={styles.quickFilterButton}
              sx={{
                borderRadius: '25px',
                ml: 1,
                span: { margin: { xs: 0, sm: '0 8px 0 -4px' } },
              }}
            >
              <Typography variant="body2" display={{ xs: 'none', sm: 'block' }}>
                {filter.label}
              </Typography>
            </Button>
          ))}
        </Box>

        {/* 3. Sort by */}
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
              key={option.value}
              size="small"
              className={styles.sortButton}
              sx={{
                textTransform: 'capitalize',
                color:
                  option.value === 'distance'
                    ? 'primary.main'
                    : 'text.secondary',
                fontWeight: option.value === 'distance' ? 'bold' : 'normal',
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
