import { Box, Container } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { MobileView, DesktopView } from '@/layers/04_shared/ui/ReviewsRatings';

export const LocalInsights: React.FC = () => {
  return (
    <Box component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <WidgetHeader
          title="Local Insights"
          subtitle="Real experiences from visitors discovering Milano"
        />
        <MobileView /> <DesktopView />
      </Container>
    </Box>
  );
};
