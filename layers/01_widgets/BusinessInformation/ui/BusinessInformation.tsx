import { Box, Grid, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import EuroIcon from '@mui/icons-material/Euro';

// Amenities
// import WifiIcon from '@mui/icons-material/Wifi';
// import AccessibleIcon from '@mui/icons-material/Accessible';
// import DriveEtaIcon from '@mui/icons-material/DriveEta';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';

import { MOCK_BUSINESS_DETAILS } from './mockData';

interface HourEntry {
  day: string;
  hours: string;
  isToday: boolean;
}

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
}> = ({ icon: Icon, title, content, isLink }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
    <Icon sx={{ color: 'brandAccent.main', mr: 2, mt: 0.25, fontSize: 24 }} />
    <Box>
      <Typography variant="body1" fontWeight="bold" color="text.primary">
        {title}
      </Typography>
      <Typography
        variant="body1"
        color={isLink ? 'brandAccent.main' : 'text.secondary'}
        sx={{
          whiteSpace: 'pre-line', // Для переноса строки в адресе
          textDecoration: isLink ? 'underline' : 'none',
        }}
      >
        {content}
      </Typography>
    </Box>
  </Box>
);

const ScheduleRow: React.FC<HourEntry> = ({ day, hours, isToday }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      py: 1.5,
      borderBottom: '1px solid',
      borderColor: 'divider',
    }}
  >
    {/* День недели */}
    <Typography
      variant="body1"
      sx={{
        color: isToday ? 'brandAccent.main' : 'text.primary',
        fontWeight: isToday ? 'bold' : 'normal',
      }}
    >
      {day}
    </Typography>

    {/* Время */}
    <Typography variant="body1" color="text.secondary">
      {hours}
    </Typography>
  </Box>
);

interface BusinessInformationProps {
  data?: BusinessDetails;
}

const HoursSection: React.FC<{ hours: HourEntry[] }> = ({ hours }) => {
  const todayHours = hours.find((h) => h.isToday) || hours[0];
  const isOpen = todayHours.hours !== 'Closed';
  const statusText = isOpen
    ? `Open Now • Closes at ${todayHours.hours.split(',').pop()?.trim().split(' - ').pop()}`
    : `Closed Today`;
  const statusColor = isOpen ? 'success' : 'error';
  const IconComponent = isOpen ? CheckCircleOutlineIcon : AccessTimeIcon;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        {hours.map((entry) => (
          <ScheduleRow key={entry.day} {...entry} />
        ))}
      </Box>

      {/* Блок текущего статуса */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderRadius: 2,
          bgcolor: `${statusColor}.light`,
        }}
      >
        <IconComponent
          sx={{ color: `${statusColor}.main`, mr: 1, fontSize: 24 }}
        />
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ color: `${statusColor}.dark` }}
        >
          {statusText}
        </Typography>
      </Box>
    </Box>
  );
};

/**
 * BusinessInformation - Основной виджет с информацией о заведении.
 */
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
    <Box sx={{ display: { xs: 'none', md: 'block' }, p: 3 }}>
      <WidgetHeader title="Business Information" />

      <Grid container spacing={4}>
        {/* 1. КОЛОНКА: Адрес, Телефон, Сайт, Цена */}
        <Grid size={6}>
          <InfoRow
            icon={LocationOnIcon}
            title="Address"
            content={data.address}
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

        {/* 2. КОЛОНКА: Часы работы и Удобства */}
        <Grid size={6}>
          {/* Часы работы */}
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Hours
          </Typography>
          <HoursSection hours={data.hours} />

          {/* Удобства (Amenities) */}
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 4, mb: 1 }}>
            Amenities
          </Typography>
          {data.amenities.map((a) => (
            <Box
              key={a.label}
              sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
              <a.icon sx={{ color: 'text.secondary', mr: 2, fontSize: 24 }} />
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
