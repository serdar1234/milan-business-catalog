'use client';

import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton,
  Container,
} from '@mui/material';
import {
  List as ListIcon,
  Apps as GridIcon,
  Map as MapIcon,
} from '@mui/icons-material';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { ViewType } from '@/layers/02_features/SearchHeaderVersions';

interface SearchHeaderDesktopProps {
  totalResults: number;
  pageTitle: string;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: 'distance', label: 'Distance' },
  { value: 'rating', label: 'Rating' },
  { value: 'price', label: 'Price' },
  { value: 'popular', label: 'Popular' },
];

export const SearchHeaderDesktop: React.FC<SearchHeaderDesktopProps> = ({
  totalResults,
  pageTitle,
  currentView,
  onViewChange,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'distance';

  const handleSortChange = (event: { target: { value: unknown } }) => {
    const newSortValue = event.target.value as string;
    const params = new URLSearchParams(searchParams.toString());

    if (newSortValue && newSortValue !== 'distance') {
      params.set('sort', newSortValue);
    } else {
      params.delete('sort');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'list' | 'grid' | 'map' | null,
  ) => {
    if (newView !== null) {
      onViewChange(newView);
      const params = new URLSearchParams(searchParams.toString());

      if (newView !== 'list') {
        params.set('view', newView);
      } else {
        params.delete('view');
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        p: '2rem 3rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight="bold">
          {pageTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Found {totalResults} places
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="sort-by-label">Sort by:</InputLabel>
          <Select
            labelId="sort-by-label"
            value={currentSort}
            onChange={handleSortChange}
            label="Sort by:"
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ToggleButtonGroup
          value={currentView}
          exclusive
          onChange={handleViewChange}
          size="small"
          sx={{
            bgcolor: 'background.paper',
            borderRadius: '8px',
            border: '1px solid var(--color-border-grey)',
            '& .MuiToggleButtonGroup-grouped': {
              border: 'none',
              borderRadius: '8px !important',
              '&.Mui-selected': {
                bgcolor: 'brandAccent.main',
                color: 'white',
                '&:hover': { bgcolor: 'brandAccent.dark' },
              },
            },
          }}
        >
          <ToggleButton value="list" aria-label="list view">
            <ListIcon
              sx={{ color: currentView === 'list' ? 'white' : 'text.primary' }}
            />
            List
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid view">
            <GridIcon
              sx={{ color: currentView === 'grid' ? 'white' : 'text.primary' }}
            />
            Grid
          </ToggleButton>
          <ToggleButton value="map" aria-label="map view">
            <MapIcon
              sx={{ color: currentView === 'map' ? 'white' : 'text.primary' }}
            />
            Map
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Container>
  );
};
