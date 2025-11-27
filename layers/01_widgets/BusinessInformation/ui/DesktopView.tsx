import { HoursSection } from '@/layers/01_widgets/BusinessInformation/ui/BusinessHours';
import { Box, Typography, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import EuroIcon from '@mui/icons-material/Euro';
import { InfoRow } from './InfoRow';
// import { BusinessInformationProps } from './BusinessInformation';
import { MOCK_BUSINESS_DETAILS as mocks } from '@/layers/04_shared/api/mocks/businessDetailsMocks';
import { Business } from '@/layers/04_shared/api/mocks/businessMocks';

export const DesktopView: React.FC<{ data?: Business }> = ({ data }) => {
  const priceRange = '€€';
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
        <Grid size={12}>
          <InfoRow
            icon={LocationOnIcon}
            title="Address"
            content={data?.address || ''}
            isLink
          />
          <InfoRow
            icon={PhoneIcon}
            title="Phone"
            content={data?.phone || ''}
            isLink
          />
          <InfoRow
            icon={LanguageIcon}
            title="Website"
            content={data?.website}
            isLink
          />
          <InfoRow icon={EuroIcon} title="Price Range" content={priceRange} />
        </Grid>

        {/* 2. Business Hours */}
        <Grid size={12}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Hours
          </Typography>
          <HoursSection hours={mocks.hours} />

          {mocks.amenities.map((a) => (
            <Box
              key={a.label}
              sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
              <a.icon sx={{ color: 'brandAccent.main', mr: 2, fontSize: 24 }} />
              <Typography variant="body1" color="text.primary">
                {a.label}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
