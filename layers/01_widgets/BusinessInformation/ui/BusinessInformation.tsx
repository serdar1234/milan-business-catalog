import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { HoursSection } from '@/layers/01_widgets/BusinessInformation/ui/BusinessHours';
import {
  // HourEntry,
  MOCK_BUSINESS_DETAILS,
} from '@/layers/04_shared/api/mocks/businessDetailsMocks';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { DesktopView } from './DesktopView';
import { Business } from '@/layers/04_shared/types/types';

// interface BusinessDetails {
//   address: string;
//   phone: string;
//   website: string;
//   priceRange: string;
//   hours: HourEntry[];
//   amenities: { icon: React.ElementType; label: string; isAvailable: boolean }[];
// }

export interface BusinessInformationProps {
  data?: Business;
}

export const BusinessInformation: React.FC<BusinessInformationProps> = ({
  data,
}) => {
  const data2 = MOCK_BUSINESS_DETAILS;
  return (
    <Grid
      size={12}
      sx={{ mb: 4 }}
      component="section"
      aria-label="Business Location and Operating Hours"
    >
      <Box display={{ xs: 'block', md: 'none' }}>
        <WidgetHeader title="Opening Hours" />
        <HoursSection hours={data2.hours} />
      </Box>
      <DesktopView data={data} />
    </Grid>
  );
};
