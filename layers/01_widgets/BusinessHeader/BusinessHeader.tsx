import { Box, Container } from '@mui/material';
import { MobileBusinessHeader } from '@/layers/02_features/MobileBusinessHeader/ui/MobileBusinessHeader';
import { BusinessHeroDesktop } from '@/layers/02_features/BusinessHeroDesktop/ui/BusinessHeroDesktop';
import { Business } from '@/layers/04_shared/types/types';

export function BusinessHeader({ data }: { data?: Business }) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'var(--color-surface)',
      }}
    >
      <Container maxWidth="lg">
        <MobileBusinessHeader data={data} />

        <BusinessHeroDesktop data={data} />
      </Container>
    </Box>
  );
}
