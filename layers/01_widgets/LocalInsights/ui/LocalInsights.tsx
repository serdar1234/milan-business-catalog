import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { MobileView } from '@/layers/04_shared/ui/ReviewsRatingsViews';
import { BASE_URL } from '@/layers/03_entities/api/baseApi';
import { LanguageCode } from '@/layers/04_shared/configs/settings';
import Grid from '@mui/material/Grid';
import { InsightCard } from '@/layers/02_features/InsightCard/ui/InsightCard';

export interface Insight {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
  company: Company;
}
interface Company {
  id: number;
  slug: string;
  name: string;
}

export const LocalInsights: React.FC<{ lang: LanguageCode }> = async ({
  lang,
}) => {
  const result = await fetch(`${BASE_URL}/reviews/latest?lang=${lang}`);

  if (!result.ok) {
    return null;
  }
  const { data }: { data: Insight[] } = await result.json();

  return (
    <Box component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <WidgetHeader
          title="Local Insights"
          subtitle="Real experiences from visitors discovering Milano"
        />
        <MobileView data={data} />
        <Box display={{ xs: 'none', md: 'block' }}>
          <Grid container spacing={4} justifyContent="center">
            {data.map((insight) => (
              <Grid size={4} key={insight.id}>
                <InsightCard insight={insight} isDesktop={true} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
