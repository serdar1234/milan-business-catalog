import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { Business } from '@/layers/04_shared/api/mocks/businessMocks';
import Image from 'next/image';

interface BusinessCardSmallProps {
  business: Business;
}

export const BusinessCardSmall: React.FC<BusinessCardSmallProps> = ({
  business,
}) => {
  const { id, images, name, average_rating, description, distance, isOpen } =
    business;
  if (!id) console.log('No id for place', business);
  return (
    <Box
      component={Link}
      href={`/business/${id}`}
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        my: 1,
        width: '100%',
        textDecoration: 'none',
        border: '1px solid var(--color-border-grey)',
        borderRadius: 2,
        transition: 'background-color 0.2s',
        '&:hover': {
          borderColor: 'brandAccent.main',
        },
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          width: 60,
          height: 60,
          borderRadius: 1,
          bgcolor: 'var( --color-border-grey)',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Typography variant="caption" color="var(--color-border-grey)">
          <Image
            src={images[0]?.url}
            alt={name}
            width={60}
            height={60}
            style={{ objectFit: 'fill' }}
          />
        </Typography>
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
        <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
          {description}
        </Typography>
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
