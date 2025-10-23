import { Box, Container } from '@mui/material';
import { MobileBusinessHeader } from '@/layers/02_features/MobileBusinessHeader/ui/MobileBusinessHeader';
import { AppBreadcrumbs } from '@/layers/04_shared/ui/AppBreadcrumbs';
import { BusinessHeroDesktop } from '@/layers/02_features/BusinessHeroDesktop/ui/BusinessHeroDesktop';

import { MOCK_BUSINESS_DETAILS } from '@/layers/03_entities/business/api/mockData';

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Restaurants', href: '/restaurants' },
  { label: MOCK_BUSINESS_DETAILS.name },
];

export default function BusinessHeader() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'var(--color-surface)',
      }}
    >
      <Container maxWidth="lg">
        <AppBreadcrumbs items={BREADCRUMBS} />
        <BusinessHeroDesktop data={MOCK_BUSINESS_DETAILS} />
        <MobileBusinessHeader data={MOCK_BUSINESS_DETAILS} />
      </Container>
    </Box>
  );
}
