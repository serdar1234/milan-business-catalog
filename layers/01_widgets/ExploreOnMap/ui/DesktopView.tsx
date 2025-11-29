'use client';

import { BusinessCardSmall } from '@/layers/02_features/BusinessCardSmall/BusinessCardSmall';
import { SearchForm } from '@/layers/02_features/SearchForm/SearchForm';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FILTER_BUTTONS } from './mockData';
import { BUSINESS_MOCKS } from '@/layers/04_shared/api/mocks/businessMocks';
import dynamic from 'next/dynamic';
import { Spinner } from '@/layers/04_shared/ui/Spinner';

const NUMBER_OF_BUSINESSES = 3;

const MapContainerClient = dynamic(
  () =>
    import('@/layers/02_features/Map/MapContainerClient').then(
      (mod) => mod.MapContainerClient,
    ),
  {
    ssr: false,
    loading: () => <Spinner bgcolor="transparent" />,
  },
);

export const DesktopView = () => (
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
                variant={label === 'All' ? 'contained' : 'outlined'}
                size="small"
                color={label === 'All' ? 'brandAccent' : 'inherit'}
                sx={{
                  color: label === 'All' ? 'white' : 'text.primary',
                  borderColor: 'var(--color-border-grey)',
                  textTransform: 'capitalize',
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <SearchForm hasBorder />

          <Box>
            {BUSINESS_MOCKS.slice(0, NUMBER_OF_BUSINESSES).map((business) => (
              <BusinessCardSmall key={business.id} business={business} />
            ))}
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ p: 2, textAlign: 'center' }}
          >
            End of list. Showing first {NUMBER_OF_BUSINESSES} of 45 places.
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
          <MapContainerClient showMapControls />
        </Box>
      </Box>
    </Container>
  </Box>
);
