import { Box, Typography, Rating } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';
import Image from 'next/image';

export interface ViewedPlace {
  slug: string;
  name: string;
  subtitle: string;
  rating: number;
  address: string;
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
  const { slug, name, subtitle, rating, address, imageUrl } = place;

  return (
    <Box
      component={Link}
      href={`/business/${slug}`}
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        mb: 2,
        alignItems: 'center',
        textDecoration: 'none',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
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
          bgcolor: 'var(--color-border-grey)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          src={imageUrl || '/r2.jpg'}
          alt={name}
          width={80}
          height={80}
          style={{ objectFit: 'cover' }}
        />
      </Box>
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
          <LocationOnIcon fontSize="small" sx={{ m: 0.5, ml: 0 }} />
          <Typography variant="body2" color="text.secondary">
            {address}
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
