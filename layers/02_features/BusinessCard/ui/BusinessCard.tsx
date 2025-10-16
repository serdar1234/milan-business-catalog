import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Chip,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneIcon from '@mui/icons-material/Phone';
import Link from 'next/link';

import { Business } from '@/layers/03_entities/business/api/businessMocks';

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const { name, category, rating, address, isFavorite, imageUrl, id, tag } =
    business;

  return (
    // Оборачиваем Card в Link, чтобы сделать всю карточку кликабельной
    <Card
      component={'article'}
      sx={{
        width: '100%',
        textDecoration: 'none',
        // Используем цвет поверхности (белый)
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
        {/* Изображение */}
        <CardMedia
          component="img"
          // Временно используем мок-изображение, так как моки не содержат реальных путей
          // В реальном приложении: src={imageUrl}
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
              bgcolor: tag.color, // Используем цвет из моков
              color: 'white',
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
            color: isFavorite ? 'brandPin.main' : 'white', // Красная иконка, если добавлено
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

      {/* Контент карточки */}
      <CardContent>
        {/* Категория и Рейтинг */}
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

        {/* Title */}
        <Link href={`/business/${id}`}>
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

        {/* Address */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PlaceIcon
            sx={{ fontSize: 16, color: 'brandAccent.main', mr: 0.5 }}
          />
          <Typography variant="body2" color="text.secondary">
            {address}
          </Typography>
        </Box>
      </CardContent>

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
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            bgcolor: 'brandAccent.main',
            '&:hover': { bgcolor: '#c14e26' },
          }}
        >
          Reserve a Spot
        </Button>
      </Box>

      {/* 2б. ДЕСКТОПНАЯ ВЕРСИЯ CTA (3 кнопки) */}
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
        {/* Reserve */}
        <Button
          variant="contained"
          sx={{
            flexGrow: 1,
            bgcolor: 'brandAccent.main',
            '&:hover': { bgcolor: 'brandAccent.dark' },
          }}
        >
          Reserve
        </Button>

        {/* Directions */}
        <IconButton
          size="large"
          sx={{
            bgcolor: 'background.default',
            color: 'brandAccent.main',
            border: '1px solid #ccc',
            '&:hover': { bgcolor: '#f0f0f0' },
          }}
          aria-label="Get directions"
        >
          <DirectionsIcon />
        </IconButton>

        {/* Phone */}
        <IconButton
          size="large"
          sx={{
            bgcolor: 'background.default',
            color: 'brandAccent.main',
            border: '1px solid #ccc',
            '&:hover': { bgcolor: '#f0f0f0' },
          }}
          aria-label="Call business"
        >
          <PhoneIcon />
        </IconButton>
      </Box>
    </Card>
  );
};
