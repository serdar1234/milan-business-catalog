'use client';

import { Box, Container } from '@mui/material';
import { MobileBusinessHeader } from '@/layers/02_features/MobileBusinessHeader/ui/MobileBusinessHeader';
import { BusinessHeroDesktop } from '@/layers/02_features/BusinessHeroDesktop/ui/BusinessHeroDesktop';

import { MOCK_BUSINESS_DETAILS } from '@/layers/03_entities/business/api/mockData';
import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';

export default function BusinessHeader() {
  const isMobile = useViewportWidth();
  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'var(--color-surface)',
      }}
    >
      <Container maxWidth="lg">
        {isMobile ? (
          <MobileBusinessHeader data={MOCK_BUSINESS_DETAILS} />
        ) : (
          <BusinessHeroDesktop data={MOCK_BUSINESS_DETAILS} />
        )}
      </Container>
    </Box>
  );
}
