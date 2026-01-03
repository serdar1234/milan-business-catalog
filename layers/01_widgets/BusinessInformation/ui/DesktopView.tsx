import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { HoursSection } from '@/layers/01_widgets/BusinessInformation/ui/BusinessHours';
import { MOCK_BUSINESS_DETAILS as mocks } from '@/layers/04_shared/api/mocks/businessDetailsMocks';
import { Business } from '@/layers/04_shared/types/types';
import AddressPhoneWebsite from './AddressPhoneWebsite';

export const DesktopView: React.FC<{ data?: Business }> = ({ data }) => {
  return (
    <Box
      sx={{
        display: {
          xs: 'none',
          md: 'block',
        },
        bgcolor: 'background.paper',
        borderRadius: '1rem',
        boxShadow: 4,
        p: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'var(--font-inter)' }}>
        Business Information
      </Typography>

      <Grid container spacing={4}>
        {/* 1. Address, Phone, Website, Price Range */}
        <AddressPhoneWebsite data={data} />

        {/* 2. Business Hours */}
        <Grid size={12} aria-label="Business Operating Hours">
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Hours
          </Typography>
          <HoursSection hours={mocks.hours} />
        </Grid>
      </Grid>
    </Box>
  );
};
