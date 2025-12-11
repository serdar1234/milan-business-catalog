import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { Business } from '@/layers/04_shared/types/types';
import Image from 'next/image';

interface BusinessCardSmallProps {
  business: Business;
}

export const BusinessCardSmall: React.FC<BusinessCardSmallProps> = ({
  business,
}) => {
  const { slug, images, name, average_rating, description, distance, isOpen } =
    business;
  return (
    <Box
      component={Link}
      href={`/business/${slug}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: '1rem',
        mb: 2,
        alignItems: 'stretch',
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
      {/* 1. TOP SECTION */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 1,
        }}
      >
        <Box>
          <Typography
            variant="body1"
            fontWeight="bold"
            color="brandAccent.main"
            sx={{
              mr: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Rating
            value={average_rating}
            readOnly
            precision={0.1}
            size="small"
            sx={{ mr: 0.5, color: 'brandPin.main' }}
          />
          <Typography variant="body2" color="text.secondary">
            ({average_rating.toFixed(1)})
          </Typography>
        </Box>
      </Box>

      {/* 2. BOTTOM SECTION */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <Box
          sx={{
            flexShrink: 0,
            width: 70,
            height: 70,
            borderRadius: 1,
            bgcolor: 'var(--color-border-grey)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <Image
            src={images[0]?.url || '/logo.png'}
            alt={name}
            width={70}
            height={70}
            style={{ objectFit: 'cover' }}
          />
        </Box>

        <Box sx={{ flexGrow: 1, position: 'relative', minHeight: 70 }}>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              mb: 1,
            }}
          >
            {description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mt: 'auto',
            }}
          >
            {distance && (
              <Typography variant="caption" color="text.secondary">
                {distance} away
              </Typography>
            )}

            {isOpen && (
              <Chip
                label="Open Now"
                size="small"
                color="statusFeatured"
                sx={{
                  height: 20,
                  fontWeight: 'medium',
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
