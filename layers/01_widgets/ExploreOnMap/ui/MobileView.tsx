import { Box, Typography, Button, Chip } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { NEARBY_CHIPS } from './mockData';

export const MobileView = () => (
  <Box
    sx={{
      backgroundImage:
        'linear-gradient(45deg, var(--color-brand-primary), var(--color-text-primary))',
      p: 3,
      borderRadius: 2,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        mb: 2,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="var(--color-surface)"
          mb={0.5}
        >
          Explore on Map
        </Typography>
        <Typography
          variant="body2"
          color="rgb(from var(--color-surface) r g b / 0.7)"
        >
          Find the best spots near your current location.
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="surface"
        sx={{
          bgcolor: 'background.paper',
          color: 'brandPrimary.main',
          '&:hover': {
            bgcolor: 'background.default',
          },
          px: 2,
          ml: 4,
        }}
        startIcon={<MapIcon />}
      >
        Open map
      </Button>
    </Box>

    <Box
      sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        flexWrap: 'wrap',
      }}
    >
      {NEARBY_CHIPS.map((chip) => (
        <Chip
          key={chip.label}
          label={chip.label}
          size="small"
          sx={{
            flexShrink: 0,
            bgcolor: 'rgb(from var(--color-surface) r g b / 0.15)',
            color: 'background.paper',
            fontWeight: 'medium',
          }}
        />
      ))}
    </Box>
  </Box>
);
