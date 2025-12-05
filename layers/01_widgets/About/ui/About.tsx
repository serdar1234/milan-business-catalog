import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { RatingBox } from '@/layers/04_shared/ui/RatingBox';
import { Business } from '@/layers/04_shared/types/types';

type Props = {
  data?: Business;
};

const MobileView: React.FC<Props> = ({ data }) => (
  <Box display={{ xs: 'block', md: 'none' }}>
    <WidgetHeader title="About" />
    <Box
      sx={{
        my: 4,
        bgcolor: 'background.paper',
        boxShadow: 4,
        borderRadius: '1rem',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="body1" color="data.secondary" sx={{ mb: 3 }}>
          {data?.description ?? ''}
        </Typography>

        <Grid container spacing={2}>
          <RatingBox name="Rating" data={data?.average_rating || 0} />
          <RatingBox name="Reviews" data={data?.approved_reviews_count || 0} />
        </Grid>
      </Box>
    </Box>
  </Box>
);

const DesktopView: React.FC<Props> = ({ data }) => (
  <Box
    display={{ xs: 'none', md: 'block' }}
    sx={{
      my: 3,
      bgcolor: 'background.paper',
      boxShadow: 4,
      borderRadius: '1rem',
    }}
  >
    <Box sx={{ p: 4 }}>
      <WidgetHeader title={`About ${data?.name}`} />
      <Typography
        variant="body1"
        color="data.secondary"
        sx={{ mb: 4, whiteSpace: 'pre-line' }}
      >
        {data?.description ?? ''}
      </Typography>
    </Box>
  </Box>
);

export const About: React.FC<Props> = ({ data }) => {
  return (
    <Box component="section" sx={{ py: { xs: 4, md: 0 } }}>
      <MobileView data={data} />
      <DesktopView data={data} />
    </Box>
  );
};
