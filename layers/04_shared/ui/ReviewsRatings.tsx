import { Box, Button, Grid } from '@mui/material';
import Link from 'next/link';
import { INSIGHT_MOCKS } from '@/layers/04_shared/api/mocks/localInsightsMocks';
import { InsightCard } from '@/layers/02_features/InsightCard/ui/InsightCard';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';

export const MobileView = ({ withButton = false }) => (
  <Box
    display={{ xs: 'block', md: 'none' }}
    component="section"
    boxShadow={4}
    sx={{
      bgcolor: 'background.paper',
      borderRadius: '1rem',
      p: '1.5rem',
    }}
  >
    <WidgetHeader title="Reviews & Ratings" />
    <Box>
      {INSIGHT_MOCKS.slice(0, 2).map((insight) => (
        <InsightCard key={insight.id} insight={insight} isDesktop={false} />
      ))}
    </Box>
    {withButton && (
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
    )}
  </Box>
);

export const DesktopView = ({ withButton = false }) => (
  <Box display={{ xs: 'none', md: 'block' }}>
    <Grid container spacing={4} justifyContent="center">
      {INSIGHT_MOCKS.map((insight) => (
        <Grid size={4} key={insight.id}>
          <InsightCard insight={insight} isDesktop={true} />
        </Grid>
      ))}
    </Grid>

    {withButton && (
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          component={Link}
          href="/stories"
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            px: 4,
          }}
        >
          Read More Stories
        </Button>
      </Box>
    )}
  </Box>
);
