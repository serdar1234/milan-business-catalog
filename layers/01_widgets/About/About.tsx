import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { Business } from '@/layers/04_shared/types/types';

type Props = {
  data?: Business;
};

export const About: React.FC<Props> = ({ data }) => {
  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        bgcolor: 'background.paper',
        boxShadow: 4,
        borderRadius: '1rem',
      }}
      component="section"
    >
      <WidgetHeader title={`About ${data?.name}`} />
      <Typography
        variant="body1"
        color="data.secondary"
        sx={{ mb: 4, whiteSpace: 'pre-line' }}
      >
        {data?.description ?? ''}
      </Typography>
    </Box>
  );
};
