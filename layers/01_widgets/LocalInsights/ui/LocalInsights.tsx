import { Box, Container, Button, Grid } from '@mui/material';
import { InsightCard } from '@/layers/02_features/InsightCard/ui/InsightCard';
import Link from 'next/link';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';

import { INSIGHT_MOCKS } from './mockData';

export const LocalInsights: React.FC = () => {
  const DesktopView = (
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

  const MobileView = (
    <>
      <Box>
        {INSIGHT_MOCKS.slice(0, 2).map((insight) => (
          <InsightCard key={insight.id} insight={insight} isDesktop={false} />
        ))}
      </Box>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          component={Link}
          href="/insights"
          variant="text"
          color="brandAccent"
          sx={{ fontWeight: 'bold' }}
        >
          View More Tips
        </Button>
      </Box>
    </>
  );

  return (
    <Box component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <WidgetHeader
          title="Local Insights"
          subtitle="Real experiences from visitors discovering Milano"
        />
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>{DesktopView}</Box>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>{MobileView}</Box>
      </Container>
    </Box>
  );
};
