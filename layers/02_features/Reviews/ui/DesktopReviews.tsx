import { INSIGHT_MOCKS } from '@/layers/01_widgets/LocalInsights/ui/mockData';
import { Grid, Box, Button } from '@mui/material';
import Link from 'next/link';
import { InsightCard } from '../../InsightCard/ui/InsightCard';

export const DesktopView = () => (
  <>
    <Grid container spacing={4} justifyContent="center">
      {INSIGHT_MOCKS.map((insight) => (
        <Grid size={4} key={insight.id}>
          <InsightCard insight={insight} isDesktop={true} />
        </Grid>
      ))}
    </Grid>

    <Box sx={{ textAlign: 'center', mt: 6 }}>
      <Button
        component={Link}
        href="/stories"
        variant="contained"
        color="brandPrimary"
        sx={{
          fontWeight: 'bold',
          color: 'white',
          px: 4,
        }}
      >
        Read More Stories
      </Button>
    </Box>
  </>
);
