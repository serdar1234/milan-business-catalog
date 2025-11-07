import { Box, Container } from '@mui/material';
import { MobileBusinessHeader } from '@/layers/02_features/MobileBusinessHeader/ui/MobileBusinessHeader';
import { BusinessHeroDesktop } from '@/layers/02_features/BusinessHeroDesktop/ui/BusinessHeroDesktop';

import { MOCK_BUSINESS_DETAILS } from '@/layers/03_entities/business/api/mockData';

export default function BusinessHeader() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'var(--color-surface)',
      }}
    >
      <Container maxWidth="lg">
        <MobileBusinessHeader data={MOCK_BUSINESS_DETAILS} />

        <BusinessHeroDesktop data={MOCK_BUSINESS_DETAILS} />
      </Container>
    </Box>
  );
}
