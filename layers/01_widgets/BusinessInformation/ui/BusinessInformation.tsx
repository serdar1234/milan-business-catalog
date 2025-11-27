import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { HoursSection } from '@/layers/01_widgets/BusinessInformation/ui/BusinessHours';
import {
  HourEntry,
  MOCK_BUSINESS_DETAILS,
} from '@/layers/04_shared/api/mocks/businessDetailsMocks';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { DesktopView } from './DesktopView';

interface BusinessDetails {
  address: string;
  phone: string;
  website: string;
  priceRange: string;
  hours: HourEntry[];
  amenities: { icon: React.ElementType; label: string; isAvailable: boolean }[];
}

export interface BusinessInformationProps {
  data?: BusinessDetails;
}

export const BusinessInformation: React.FC<BusinessInformationProps> = () => {
  const data = MOCK_BUSINESS_DETAILS;
  return (
    <Grid size={12} sx={{ mb: 4 }}>
      <Box display={{ xs: 'block', md: 'none' }}>
        <WidgetHeader title="Opening Hours" />
        <HoursSection hours={data.hours} />
      </Box>
      <DesktopView data={data} />
    </Grid>
  );
};
