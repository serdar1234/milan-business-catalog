'use client';

import { Box, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Link from 'next/link';

interface SavedPlace {
  id: number;
  name: string;
  subtitle: string;
  imageUrl: string;
}

interface SavedPlaceCardProps {
  place: SavedPlace;
}

export const SavedPlaceCard: React.FC<SavedPlaceCardProps> = ({ place }) => {
  const { id, name, subtitle, imageUrl } = place;

  return (
    <Box
      component={Link}
      href={`/business/${id}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        textDecoration: 'none',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        mb: 2,
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: 4,
        },
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          width: 80,
          height: 80,
          borderRadius: 1,
          bgcolor: 'grey.300',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 0, py: 1 }}>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          noWrap
        >
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {subtitle}
        </Typography>
      </Box>

      <Box
        sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 0.5 }}
      >
        <IconButton
          size="small"
          onClick={(e) => {
            e.preventDefault();
            console.log('Remove from Saved');
          }}
          sx={{ color: 'statusError.main' }}
        >
          <FavoriteIcon />
        </IconButton>

        <IconButton
          size="small"
          onClick={(e) => {
            e.preventDefault();
            console.log('Share');
          }}
          sx={{ color: 'text.secondary', ml: 0.5 }}
        >
          <ShareIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
