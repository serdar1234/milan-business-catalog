'use client';

import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import BusinessCardGrid from '@/layers/02_features/BusinessCardGrid';
import { Business } from '@/layers/04_shared/types/types';

interface Props {
  initialData: Business[];
}

export function SeasonFavoritesClient({ initialData }: Props) {
  const isMobile = useMediaQuery('(max-width:900px)');
  const numberOfCols = isMobile ? 2 : 3;

  const featuredBusinesses = initialData.slice(0, numberOfCols);

  if (featuredBusinesses.length === 0) {
    return null;
  }

  return (
    <Box component="section">
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <WidgetHeader
          title="Season Favorites"
          subtitle="Hand-picked spots perfect for Milano's winter season"
        />

        <Grid container spacing={2}>
          <BusinessCardGrid data={featuredBusinesses} cols={numberOfCols} />
        </Grid>
      </Container>
    </Box>
  );
}
