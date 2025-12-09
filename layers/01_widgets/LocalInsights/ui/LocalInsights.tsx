import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { BASE_URL } from '@/layers/03_entities/api/baseApi';
import { LanguageCode } from '@/layers/04_shared/configs/settings';
import { InsightCard } from '@/layers/02_features/InsightCard/ui/InsightCard';
import { Insight } from '@/layers/04_shared/types/types';

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
        <Box>
          <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
            {data.map((insight) => (
              <Grid size={{ xs: 12, md: 4 }} key={insight.id}>
                <InsightCard insight={insight} isDesktop={true} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
