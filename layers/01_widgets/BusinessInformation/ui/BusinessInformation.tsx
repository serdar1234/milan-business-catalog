'use client';

import { Box, Grid } from '@mui/material';
import {
  HourEntry,
  HoursSection,
} from '@/layers/03_entities/business/ui/BusinessHours';
import { MOCK_BUSINESS_DETAILS } from '@/layers/03_entities/business/api/mockData';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { DesktopView } from './DesktopView';
import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';

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

export const BusinessInformation: React.FC<BusinessInformationProps> = ({
  data = MOCK_BUSINESS_DETAILS,
}) => {
  const isMobile = useViewportWidth();
  const MobileView = (
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <WidgetHeader title="Opening Hours" />
      <HoursSection hours={data.hours} />
    </Box>
  );

  return (
    <Grid size={12} sx={{ mb: 4 }}>
      {isMobile ? MobileView : <DesktopView data={data} />}
    </Grid>
  );
};
