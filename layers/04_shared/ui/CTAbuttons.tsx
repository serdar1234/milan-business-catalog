'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import RoundIconButton from '@/layers/04_shared/ui/RoundIconButton';
import { useRouter } from 'next/navigation';

export const CTAbuttons = ({
  phone,
  coordinates,
  slug,
}: {
  phone: string;
  coordinates: { lat: number; lon: number };
  slug: string;
}) => {
  const router = useRouter();
  const handleClick = () => {
    const { lat, lon } = coordinates;
    const url = `/map?lat=${lat}&lon=${lon}&slug=${slug}`;
    router.push(url);
  };
  return (
    <Box
      sx={{
        display: 'flex',
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
        onClick={handleClick}
      >
        Show on Map
      </Button>

      <RoundIconButton href={`tel:${phone}`} aria-label="Call business">
        <PhoneIcon />
      </RoundIconButton>
    </Box>
  );
};
