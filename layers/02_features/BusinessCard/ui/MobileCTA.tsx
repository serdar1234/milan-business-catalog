import { Box, Button } from '@mui/material';

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
