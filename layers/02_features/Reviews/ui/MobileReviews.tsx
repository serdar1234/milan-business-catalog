import { INSIGHT_MOCKS } from '@/layers/01_widgets/LocalInsights/ui/mockData';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { InsightCard } from '../../InsightCard/ui/InsightCard';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';

interface MobileViewProps {
  withButton?: boolean;
}

export const MobileView: React.FC<MobileViewProps> = ({
  withButton = true,
}) => (
  <Box
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
