import { Box, Container, Button, Grid } from '@mui/material';
import { InsightCard } from '@/layers/02_features/InsightCard/ui/InsightCard';
import Link from 'next/link';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';

const INSIGHT_MOCKS = [
  {
    id: 1,
    user: 'Jose M.',
    avatarUrl: '/mocks/avatar-jose.jpg',
    text: 'The aperitivo scene in Navigli was absolutely magical in winter. The heated terraces, warm cocktails, and canal views created the perfect atmosphere for our evening out.',
    timeAgo: '2 days',
    rating: 5,
    locationText: 'Navigli Social Club',
    label: 'Verified' as const,
    likes: 24,
  },
  {
    id: 2,
    user: 'Emma K.',
    avatarUrl: '/mocks/avatar-alessandra.jpg',
    text: 'The Christmas markets were enchanting! Hot chocolate, beautiful crafts, and the festive atmosphere made our Milano winter trip unforgettable.',
    timeAgo: '3 days',
    rating: 4,
    locationText: 'Christmas Markets',
    label: 'Verified' as const,
    likes: 35,
  },
  {
    id: 3,
    user: 'Marco T.',
    avatarUrl: '/mocks/avatar-james.jpg',
    text: '“Osteria del Borgo exceeded all expectations. The truffle risotto was phenomenal, and the cozy atmosphere made it perfect for a winter dinner date.',
    timeAgo: '1 week',
    rating: 4.5,
    locationText: 'Osteria del Borgo',
    label: 'Tourist' as const,
    likes: 18,
  },
];

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
