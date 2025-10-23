import { Box, Grid, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import EuroIcon from '@mui/icons-material/Euro';

import {
  HourEntry,
  HoursSection,
} from '@/layers/03_entities/business/ui/BusinessHours';
import { MOCK_BUSINESS_DETAILS } from '@/layers/03_entities/business/api/mockData';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';

interface BusinessDetails {
  address: string;
  phone: string;
  website: string;
  priceRange: string;
  hours: HourEntry[];
  amenities: { icon: React.ElementType; label: string; isAvailable: boolean }[];
}

const InfoRow: React.FC<{
  icon: React.ElementType;
  title: string;
  content: React.ReactNode;
  isLink?: boolean;
}> = ({ icon: Icon, title, content, isLink }) => {
  let linkText: string = '';
  if (isLink) {
    if (title === 'Website') linkText = 'https://' + content;
    else if (title === 'Phone') linkText = 'tel:' + content;
    else if (title === 'Address')
      linkText = `https://maps.google.com/?q=${encodeURIComponent(content as string)}`;
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      <Icon sx={{ color: 'brandAccent.main', mr: 2, mt: 0.25, fontSize: 24 }} />
      <Box>
        <Typography variant="body1" fontWeight="bold" color="text.primary">
          {title}
        </Typography>
        <Typography
          variant="body1"
          component={isLink ? 'a' : 'span'}
          href={isLink ? (linkText as string) : undefined}
          target={isLink ? '_blank' : undefined}
          sx={{
            cursor: isLink ? 'pointer' : 'default',
            whiteSpace: 'pre-line',
          }}
        >
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

interface BusinessInformationProps {
  data?: BusinessDetails;
}

export const BusinessInformation: React.FC<BusinessInformationProps> = ({
  data = MOCK_BUSINESS_DETAILS,
}) => {
  // --- Мобильная версия: Только часы работы ---
  const MobileView = (
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <WidgetHeader title="Opening Hours" />
      <HoursSection hours={data.hours} />
    </Box>
  );

  // --- Десктопная версия: Полная информация ---
  const DesktopView = (
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
      <Typography
        variant="h5"
        fontFamily='"Inter", "Inter Fallback"'
        sx={{ mb: 2 }}
      >
        Business Information
      </Typography>

      <Grid container spacing={4}>
        {/* 1. Address, Phone, Website, Price Range */}
        <Grid size={12}>
          <InfoRow
            icon={LocationOnIcon}
            title="Address"
            content={data.address}
            isLink
          />
          <InfoRow icon={PhoneIcon} title="Phone" content={data.phone} isLink />
          <InfoRow
            icon={LanguageIcon}
            title="Website"
            content={data.website}
            isLink
          />
          <InfoRow
            icon={EuroIcon}
            title="Price Range"
            content={data.priceRange}
          />
        </Grid>

        {/* 2. Business Hours */}
        <Grid size={12}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Hours
          </Typography>
          <HoursSection hours={data.hours} />

          {data.amenities.map((a) => (
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

  // Вставляем мобильный виджет в основной, чтобы можно было использовать один импорт на странице
  return (
    <Grid size={{ xs: 12, md: 4 }} sx={{ mb: 4 }}>
      {MobileView}
      {DesktopView}
    </Grid>
  );
};
