'use client';

import { Meta } from '@/layers/04_shared/types/types';
import { BusinessCardSmall } from '@/layers/02_features/BusinessCardSmall/BusinessCardSmall';
import { SearchForm } from '@/layers/02_features/SearchForm/SearchForm';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { MapContainerClient } from '@/layers/02_features/Map';
import { NUMBER_OF_BUSINESSES } from './config';
import { DesktopViewClientProps, FilterButton } from './types';

export const DesktopViewClient: React.FC<DesktopViewClientProps> = ({
  initialBusinesses = [],
  initialFilter = 'All',
  availableFilters = [],
}) => {
  const [selectedFilter, setSelectedFilter] =
    useState<FilterButton>(initialFilter);

  const filteredBusinesses =
    selectedFilter === 'All'
      ? initialBusinesses
      : initialBusinesses.filter((business) => {
          const selectedFilterObj = availableFilters.find(
            (f) => f.label === selectedFilter,
          );
          return (
            selectedFilterObj?.categoryId !== undefined &&
            business.category.id === selectedFilterObj.categoryId
          );
        });

  // Calculate meta data for display
  const meta: Meta = {
    pagination: {
      page: 1,
      per_page: filteredBusinesses.length,
      total_pages: 1,
      total_count: filteredBusinesses.length,
    },
    source: 'client',
  };

  if (initialBusinesses.length === 0) {
    return (
      <Box
        display={{ xs: 'none', md: 'block' }}
        sx={{ p: 3 }}
        role="region"
        aria-label="Explore on Map - No Businesses Available"
      >
        <WidgetHeader
          title="Find Your Way Around"
          subtitle="A powerful map to explore curated places in every Milan district."
        />
        <Container maxWidth="lg">
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: 4,
              borderRadius: 2,
              textAlign: 'center',
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            role="alert"
            aria-live="polite"
          >
            <Typography variant="h6" color="text.secondary">
              No businesses available at the moment.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Please try again later or select a different filter.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      display={{ xs: 'none', md: 'block' }}
      role="main"
      aria-label="Explore on Map - Desktop View"
    >
      <WidgetHeader
        title="Find Your Way Around"
        subtitle="A powerful map to explore curated places in every Milan district."
      />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            minHeight: 700,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 4,
          }}
          role="group"
          aria-labelledby="explore-map-heading"
        >
          {/* left column */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: 3,
              borderRight: '1px solid var(--color-border-grey)',
            }}
            role="complementary"
            aria-label="Business listings and filters"
          >
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {/* Screen reader only heading */}
              <div
                style={{
                  position: 'absolute',
                  left: -10000,
                  top: 'auto',
                  width: 1,
                  height: 1,
                  overflow: 'hidden',
                }}
              >
                <h2 id="explore-map-heading">Filter Businesses</h2>
              </div>
              {availableFilters.map((filterOption) => (
                <Button
                  key={filterOption.label}
                  variant={
                    filterOption.label === selectedFilter
                      ? 'contained'
                      : 'outlined'
                  }
                  size="small"
                  color={
                    filterOption.label === selectedFilter
                      ? 'brandAccent'
                      : 'inherit'
                  }
                  sx={{
                    color:
                      filterOption.label === selectedFilter
                        ? 'white'
                        : 'text.primary',
                    borderColor: 'var(--color-border-grey)',
                    textTransform: 'capitalize',
                  }}
                  onClick={() => setSelectedFilter(filterOption.label)}
                  aria-pressed={filterOption.label === selectedFilter}
                  aria-label={`Show ${filterOption.label.toLowerCase()} businesses`}
                >
                  {filterOption.label}
                </Button>
              ))}
            </Box>

            <SearchForm hasBorder />

            {filteredBusinesses.length === 0 && selectedFilter !== 'All' && (
              <Box
                sx={{ my: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}
                role="status"
                aria-live="polite"
              >
                <Typography variant="body2" color="warning.main">
                  No businesses found for {selectedFilter} filter.
                </Typography>
              </Box>
            )}

            <Box margin="1rem 0" role="list" aria-label="Business listings">
              {filteredBusinesses
                .slice(0, NUMBER_OF_BUSINESSES)
                .map((business) => (
                  <Box key={business.id} role="listitem">
                    <BusinessCardSmall business={business} />
                  </Box>
                ))}
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ p: 2, textAlign: 'center' }}
              role="status"
              aria-live="polite"
            >
              End of list. Showing first{' '}
              {Math.min(NUMBER_OF_BUSINESSES, filteredBusinesses.length)}{' '}
              of&nbsp;
              {meta?.pagination.total_count} places.
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: 'secondary.light',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            role="complementary"
            aria-label="Interactive map showing business locations"
          >
            <MapContainerClient
              showMapControls
              businesses={filteredBusinesses}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
