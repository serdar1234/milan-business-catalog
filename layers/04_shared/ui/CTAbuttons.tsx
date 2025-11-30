'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneIcon from '@mui/icons-material/Phone';
import RoundIconButton from '@/layers/04_shared/ui/RoundIconButton';
import style from './ui.module.css';
import { useRouter } from 'next/navigation';

export const DesktopCTA = ({
  phone,
  coordinates,
}: {
  phone: string;
  coordinates: { lat: number; lon: number };
}) => {
  const router = useRouter();
  const handleClick = () => {
    const { lat, lon } = coordinates;
    const url = `/map?lat=${lat}&lon=${lon}`;
    router.push(url);
  };
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        gap: 1,
        p: 2,
        pt: 0,
      }}
    >
      <Button
        variant="contained"
        color="brandAccent"
        sx={{
          flexGrow: 1,
        }}
      >
        Reserve
      </Button>

      <Button
        aria-label="Call business"
        onClick={handleClick}
        className={style.roundIconButton}
      >
        <DirectionsIcon />
      </Button>

      <RoundIconButton href={`tel:${phone}`}>
        <PhoneIcon />
      </RoundIconButton>
    </Box>
  );
};

export const MobileCTA = () => {
  return (
    <Box
      sx={{
        display: { xs: 'block', md: 'none' },
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        p: 1.5,
        bgcolor: 'surface.main',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Button variant="contained" fullWidth size="large" color="brandAccent">
        Reserve a Spot
      </Button>
    </Box>
  );
};
