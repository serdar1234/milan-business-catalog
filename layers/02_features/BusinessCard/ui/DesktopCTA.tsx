import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneIcon from '@mui/icons-material/Phone';
import RoundIconButton from '@/layers/04_shared/ui/RoundIconButton';

export const DesktopCTA = ({ phone }: { phone: string }) => {
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

      <RoundIconButton href="#">
        <DirectionsIcon />
      </RoundIconButton>
      <RoundIconButton href={`tel:${phone}`}>
        <PhoneIcon />
      </RoundIconButton>
    </Box>
  );
};
