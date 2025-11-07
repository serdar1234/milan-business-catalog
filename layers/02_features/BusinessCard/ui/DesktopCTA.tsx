import { Box, Button, IconButton } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneIcon from '@mui/icons-material/Phone';

export const DesktopCTA = () => {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        gap: 1,
        p: 2,
        pt: 0,
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
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

      <IconButton
        size="large"
        sx={{
          bgcolor: 'background.default',
          color: 'brandAccent.main',
          border: '1px solid var(--color-border-grey)',
        }}
        aria-label="Get directions"
      >
        <DirectionsIcon />
      </IconButton>

      <IconButton
        size="large"
        sx={{
          bgcolor: 'background.default',
          color: 'brandAccent.main',
          border: '1px solid var(--color-border-grey)',
        }}
        aria-label="Call business"
      >
        <PhoneIcon />
      </IconButton>
    </Box>
  );
};
