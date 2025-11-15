'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {
  FilterList as FilterIcon,
  List as ListIcon,
  Map as MapIcon,
  Apps as GridIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  Place as PlaceIcon,
} from '@mui/icons-material';
import styles from './SearchHeaderMobile.module.css';

import type { ViewType } from '@/layers/02_features/SearchHeaderVersions';

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
    event: React.MouseEvent<HTMLElement>,
    newView: ViewType | null,
  ) => {
    if (newView !== null) {
      onViewChange(newView);
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

          {/* List/Map toggle */}
          <ToggleButtonGroup
            value={currentView}
            exclusive
            onChange={handleViewChange}
            size="small"
            sx={{
              borderRadius: '8px',
              '& .MuiToggleButtonGroup-grouped': {
                margin: 0,
                border: '1px solid',
                borderColor: 'var(--color-border-grey)',
                '&.Mui-selected': {
                  bgcolor: 'brandPin.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'brandPin.dark' },
                },
              },
            }}
          >
            <ToggleButton value="list" aria-label="list view">
              <ListIcon
                sx={{
                  color: currentView === 'list' ? 'white' : 'text.primary',
                }}
              />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid view">
              <GridIcon
                sx={{
                  color: currentView === 'grid' ? 'white' : 'text.primary',
                }}
              />
            </ToggleButton>
            <ToggleButton value="map" aria-label="map view">
              <MapIcon
                sx={{ color: currentView === 'map' ? 'white' : 'text.primary' }}
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* 2. Rounded buttons */}
        <Box
          className={styles.quickFiltersContainer}
          sx={{ '& > *': { mr: 1, flexShrink: 0 } }}
        >
          {/* "All Filters" */}
          <Button
            variant="contained"
            color="brandPin"
            startIcon={<FilterIcon />}
            onClick={onFilterClick}
            sx={{ borderRadius: '25px' }}
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
                '&:hover': { borderColor: 'var(--color-border-grey-dark)' },
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
          {/* Опции сортировки как текст-кнопки */}
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
