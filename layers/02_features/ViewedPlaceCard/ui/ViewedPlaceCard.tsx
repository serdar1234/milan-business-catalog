import { Box, Typography, Rating } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

interface ViewedPlace {
  id: number;
  name: string;
  subtitle: string;
  rating: number;
  distance: string;
  imageUrl: string;
}

interface ViewedPlaceCardProps {
  place: ViewedPlace;
  withArrow?: boolean;
}

export const ViewedPlaceCard: React.FC<ViewedPlaceCardProps> = ({
  place,
  withArrow = true,
}) => {
  const { id, name, subtitle, rating, distance, imageUrl } = place;

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
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          width: 80,
          height: 80,
          borderRadius: 1,
          bgcolor: 'surface.main',
          backgroundImage: `url(/${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          noWrap
        >
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {subtitle}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating
            value={rating}
            readOnly
            precision={0.1}
            size="small"
            sx={{ mr: 1, color: 'brandPin.main' }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {distance}
          </Typography>
        </Box>
      </Box>
      {withArrow && (
        <ArrowForwardIcon
          sx={{ color: 'brandAccent.main', fontSize: 24, flexShrink: 0 }}
        />
      )}
    </Box>
  );
};
