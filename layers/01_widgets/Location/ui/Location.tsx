'use client';

import { Box, Typography, Grid, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { TransportRow } from './TransportRow';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';

import {
  BusinessDetails,
  MOCK_BUSINESS_DETAILS,
} from '@/layers/03_entities/business/api/mockData';
import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';

interface BusinessDetailsProps {
  data?: BusinessDetails;
}

export const Location: React.FC<BusinessDetailsProps> = ({
  data = MOCK_BUSINESS_DETAILS,
}) => {
  const isMobile = useViewportWidth();
  const MapBlock = (
    <Box
      sx={{
        position: 'relative',
        height: isMobile ? 200 : 350, // Выше на десктопе
        bgcolor: 'grey.300',
        borderRadius: 2,
        mb: isMobile ? 3 : 0, // Убираем отступ снизу на десктопе
        overflow: 'hidden',
      }}
    >
      {/* 🚨 Адресный блок (Только на Мобильном) */}
      {isMobile && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LocationOnIcon
            sx={{ color: 'brandAccent.main', mr: 1, fontSize: 24 }}
          />
          <Box>
            <Typography variant="body1" fontWeight="bold">
              {data.fullAddress}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.cityPostal}
            </Typography>
          </Box>
        </Box>
      )}

      {/* 🚨 Кнопка Get Directions (Используем стиль image_43c915.png для десктопа) */}
      {!isMobile && (
        <Button
          variant="contained"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            bgcolor: 'background.paper',
            color: 'text.primary',
            fontWeight: 'bold',
            boxShadow: 3,
            '&:hover': { bgcolor: 'grey.100' },
          }}
          startIcon={<DirectionsIcon sx={{ color: 'brandAccent.main' }} />}
        >
          Get Directions
        </Button>
      )}

      {/* Временный маркер для карты */}
      <LocationOnIcon
        sx={{
          color: 'error.main',
          fontSize: 40,
          position: 'absolute',
          top: 50,
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </Box>
  );

  // --- Мобильная версия (Location & Directions) ---
  const MobileContent = (
    <>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Location & Directions
      </Typography>

      {MapBlock}

      {/* 2. Три кнопки действий */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={4}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              alignItems: 'center',
              bgcolor: 'brandPrimary.main',
              '&:hover': {
                bgcolor: 'hsl(from var(--color-brand-primary) h s 30%)',
              },
            }}
          >
            <DirectionsIcon />
            Directions
          </Button>
        </Grid>
        <Grid size={4}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              alignItems: 'center',
              bgcolor: 'brandSecondary.main',
            }}
          >
            <LocalParkingIcon />
            Parking
          </Button>
        </Grid>
        <Grid size={4}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              alignItems: 'center',
              bgcolor: 'var(--color-status-featured)',
              '&:hover': {
                bgcolor: 'hsl(from var(--color-status-featured) h s 10%)',
              },
            }}
          >
            <DirectionsBusIcon />
            Transit
          </Button>
        </Grid>
      </Grid>

      {/* 3. Информация о транспорте */}
      <Box>
        {data.transportInfo.map((info, index) => (
          <TransportRow key={index} {...info} />
        ))}
      </Box>
    </>
  );
  // --- Десктопная Версия ---
  const DesktopContent = (
    <Box>
      <WidgetHeader title="Location" />
      <Grid
        container
        spacing={4}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        {/* А. КОЛОНКА 1 (Карта) */}
        {MapBlock}

        {/* Б. КОЛОНКА 2 (Контактные данные и Направления) */}
        <Grid>
          {/* Направления/Транспортная информация */}
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Getting Here
          </Typography>
          <Box>
            {data.transportInfo.map((info, index) => (
              <TransportRow key={index} {...info} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 }, // Отступы разные для мобильного/десктопа
        mb: 4,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      {isMobile ? MobileContent : DesktopContent}
    </Box>
  );
};
