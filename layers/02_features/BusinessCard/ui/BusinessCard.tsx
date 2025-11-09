import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Chip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PlaceIcon from '@mui/icons-material/Place';

import Link from 'next/link';

import { Business } from '@/layers/03_entities/business/api/businessMocks';
import { slugify } from '@/layers/04_shared/utils/helpers';
import { MobileCTA } from './MobileCTA';
import { DesktopCTA } from './DesktopCTA';

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const { name, category, rating, address, isFavorite, imageUrl, tag } =
    business;

  return (
    <Card
      component={'article'}
      sx={{
        width: '100%',
        textDecoration: 'none',
        bgcolor: 'surface.main',
        borderRadius: 2,
        boxShadow: 2,
        transition: 'box-shadow 0.3s, transform 0.3s',
        '&:hover': {
          boxShadow: 8,
          transform: 'translateY(-2px)',
        },
        pb: { xs: 8, md: 0 },
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          sx={{ height: 200, objectFit: 'cover' }}
        />

        {tag && (
          <Chip
            label={tag.label}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              bgcolor: tag.color,
              color: tag.color === 'ratingGold.main' ? 'black' : 'white',
              fontWeight: 'bold',
            }}
          />
        )}

        <IconButton
          aria-label="add to favorites"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: isFavorite ? 'brandPin.main' : 'background.paper',
            bgcolor: 'rgba(255, 255, 255, 0.5)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.7)',
            },
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Toggle favorite for ${name}`);
          }}
        >
          {isFavorite ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderOutlinedIcon sx={{ color: 'brandAccent.main' }} />
          )}
        </IconButton>
      </Box>

      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight="medium"
          >
            {category}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              name="read-only"
              value={rating}
              readOnly
              precision={0.1}
              size="small"
              sx={{ mr: 0.5 }}
            />
            <Typography variant="caption" color="text.secondary">
              ({rating})
            </Typography>
          </Box>
        </Box>

        <Link href={`/business/${slugify(name)}`}>
          <Typography
            variant="h6"
            component="div"
            fontWeight="bold"
            color="text.primary"
            mb={1}
          >
            {name}
          </Typography>
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PlaceIcon
            sx={{ fontSize: 16, color: 'brandAccent.main', mr: 0.5 }}
          />
          <Typography variant="body2" color="text.secondary">
            {address}
          </Typography>
        </Box>
      </CardContent>

      <MobileCTA />
      <DesktopCTA />
    </Card>
  );
};
