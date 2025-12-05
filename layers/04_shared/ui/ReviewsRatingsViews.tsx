import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { InsightCard } from '@/layers/02_features/InsightCard/ui/InsightCard';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { Insight } from '@/layers/01_widgets/LocalInsights/ui/LocalInsights';

interface Props {
  withButton?: boolean;
  data: Insight[];
}
export const MobileView = ({ withButton = false, data }: Props) => (
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
      {data.slice(0, 2).map((insight) => (
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

export const DesktopView = ({ withButton = false, data }: Props) => (
  <Box display={{ xs: 'none', md: 'block' }}>
    <Grid container spacing={4} justifyContent="center">
      {data.map((insight) => (
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
