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
        gap: 2,
        padding: '1rem 0.5rem',
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
          width: 60,
          height: 60,
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
          width={60}
          height={60}
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <Typography
          variant="body2"
          fontWeight="bold"
          color="brandAccent.main"
          sx={{ mb: 0.2 }}
        >
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Rating
            value={average_rating}
            readOnly
            precision={0.1}
            size="small"
            sx={{ mr: 0.5, color: 'brandPin.main' }}
          />
          <Typography variant="caption" color="text.secondary">
            ({average_rating.toFixed(1)})
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            mb: 1,
            '&::before': {
              content: `'${description?.substring(0, 45) + '...'}'`,
              display: { xs: 'inline', sm: 'none', md: 'inline' },
            },
            '&::after': {
              content: `'${description}'`,
              display: { xs: 'none', sm: 'inline', md: 'none' },
            },
          }}
        />
        {distance && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              bottom: 0,
              left: '-4.5rem',
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {distance} away
            </Typography>
          </Box>
        )}

        {isOpen && (
          <Chip
            label="Open Now"
            size="small"
            color="statusFeatured"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: 20,
              fontWeight: 'medium',
            }}
          />
        )}
      </Box>
    </Box>
  );
};
