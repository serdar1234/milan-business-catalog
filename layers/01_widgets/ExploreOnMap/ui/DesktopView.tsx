'use client';

import { BusinessCardSmall } from '@/layers/02_features/BusinessCardSmall/BusinessCardSmall';
import { SearchForm } from '@/layers/02_features/SearchForm/SearchForm';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FILTER_BUTTONS, type FilterButton } from './mockData';
import { Spinner } from '@/layers/04_shared/ui/Spinner';
import { useGetFullBusinessListQuery } from '@/layers/03_entities/business/businessApi';
import { useState } from 'react';
import { MapContainerClient } from '@/layers/02_features/Map';

const NUMBER_OF_BUSINESSES = 3;

export const DesktopView = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterButton>('All');
  const args = {
    category_id:
      selectedFilter === 'All' ? undefined : selectedFilter === 'Bars' ? 1 : 2,
  };
  const { data, isLoading, isError } = useGetFullBusinessListQuery({ ...args });
  const businessList = data?.data;
  const meta = data?.meta;

  if (isLoading) {
    return <Spinner bgcolor="transparent" />;
  }

  if (isError || !businessList) {
    return null;
  }
  const { lat, lon } = businessList[1]?.coordinates;
  const coordinates: [number, number] = [lat, lon];

  return (
    <Box display={{ xs: 'none', md: 'block' }}>
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
        >
          {/* left column */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: 3,
              borderRight: '1px solid var(--color-border-grey)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {FILTER_BUTTONS.map((label) => (
                <Button
                  key={label}
                  variant={label === selectedFilter ? 'contained' : 'outlined'}
                  size="small"
                  color={label === selectedFilter ? 'brandAccent' : 'inherit'}
                  sx={{
                    color: label === selectedFilter ? 'white' : 'text.primary',
                    borderColor: 'var(--color-border-grey)',
                    textTransform: 'capitalize',
                  }}
                  onClick={() => setSelectedFilter(label)}
                >
                  {label}
                </Button>
              ))}
            </Box>

            <SearchForm hasBorder />

            <Box margin="1rem 0">
              {businessList
                .slice(1, NUMBER_OF_BUSINESSES + 1)
                .map((business) => (
                  <BusinessCardSmall key={business.id} business={business} />
                ))}
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ p: 2, textAlign: 'center' }}
            >
              End of list. Showing first {NUMBER_OF_BUSINESSES} of{' '}
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
          >
            <MapContainerClient showMapControls center={coordinates} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
