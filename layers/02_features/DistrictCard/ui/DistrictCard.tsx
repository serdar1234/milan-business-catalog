import { Box, Typography, Rating, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

interface District {
  name: string;
  subtitle: string;
  businessCount: number;
  averageRating: number;
  imageUrl: string;
  href: string;
}

interface DistrictCardProps {
  district: District;
}

export const DistrictCard: React.FC<DistrictCardProps> = ({ district }) => {
  const { name, subtitle, businessCount, averageRating, imageUrl, href } =
    district;

  return (
    <MuiLink
      component={Link}
      href={href}
      underline="none"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 200, md: 300 },
        display: 'block',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 4,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8,
        },
      }}
    >
      {/* 1. Фоновое изображение с затемнением */}
      <Box
        component="img"
        src={imageUrl}
        alt={name}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.5)',
          transition: 'transform 0.5s',
          '&:hover': {
            // Эффект увеличения при наведении
            transform: 'scale(1.05)',
          },
        }}
      />

      {/* 2. Контентное наложение (текст, рейтинг) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: { xs: 2, md: 3 },
          color: 'white', // Весь текст белый
        }}
      >
        {/* Заголовок */}
        <Typography variant="h5" component="div" fontWeight="bold" mb={0.5}>
          {name}
        </Typography>

        {/* Субтайтл */}
        <Typography variant="body2" mb={1}>
          {subtitle}
        </Typography>

        {/* Количество бизнесов и рейтинг */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Количество бизнесов */}
          <Typography variant="body2" fontWeight="medium">
            {businessCount} places
          </Typography>

          {/* Звезды рейтинга */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              name={`rating-${name}`}
              value={averageRating}
              readOnly
              precision={0.1}
              size="small"
              sx={{ color: 'brandPin.main', mr: 0.5 }}
            />
            <Typography variant="body2" fontWeight="medium">
              {averageRating.toFixed(1)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </MuiLink>
  );
};
