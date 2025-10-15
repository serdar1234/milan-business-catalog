import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import MapIcon from '@mui/icons-material/Map';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import ThermometerIcon from '@mui/icons-material/DeviceThermostat';
import Link from 'next/link';

// Категории для быстрого перехода
const QUICK_DISCOVER_CATEGORIES = [
  { name: 'Aperitivo Bars', count: 324 },
  { name: 'Cozy Restaurants', count: 567 },
  { name: 'Winter Cafés', count: 189 },
  { name: 'Art Galleries', count: 78 },
];

// Крупные цифры для статистики
const STATS = [
  { value: '1.2K+', label: 'Local spots', icon: PlaceIcon },
  { value: '4.7', label: 'Ave rating', icon: StarIcon },
  { value: '6°C', label: 'Temp today', icon: ThermometerIcon },
];

export const HeroDesktopInfo: React.FC = () => {
  return (
    <Box
      // Фон для блока: используем наш цвет поверхности с небольшой прозрачностью
      sx={{
        p: 4,
      }}
    >
      <Grid container spacing={4}>
        {/* === ЛЕВАЯ КОЛОНКА === */}
        <Grid size={7}>
          {/* Заголовок (Playfair Display) */}
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{ mb: '1.5rem', color: '#fff' }}
          >
            Discover Milano&apos;s
            <br />
            <span style={{ color: 'brandAccent.main' }}>Winter Magic</span>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: '#fff',
              opacity: 0.8,
              maxWidth: '60ch',
            }}
          >
            From canal-side aperitivo bars to cozy trattorias, explore the best
            of Milano this winter season. Find your perfect spot for warming up
            with authentic Italian experiences.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              component={Link}
              href="/discover"
              sx={{
                padding: '0.75rem 1.5rem',
                bgcolor: 'brandAccent.main',
                '&:hover': { bgcolor: '#c14e26' },
              }}
              startIcon={<ExploreIcon />}
            >
              Start Exploring
            </Button>
            <Button
              variant="outlined"
              component={Link}
              href="/map"
              sx={{
                padding: '0.75rem 1.5rem',
                color: '#fff',
                border: '2px solid',
                borderColor: 'currentColor',
              }}
              startIcon={<MapIcon />}
            >
              View Map
            </Button>
          </Box>
        </Grid>

        {/* === ПРАВАЯ КОЛОНКА === */}
        <Grid
          size={5}
          sx={{
            color: '#fff',
            border: '1px solid currentColor',
            padding: '1.5rem',
            borderRadius: '1rem',
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mb: 1,
              color: '#fff',
            }}
          >
            Quick Discover
          </Typography>

          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {QUICK_DISCOVER_CATEGORIES.map((cat) => (
              <Box
                key={cat.name}
                component="li"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1,
                }}
              >
                <Typography variant="body2" fontWeight="medium">
                  {cat.name}
                </Typography>
                <Typography variant="body2" color="#fff">
                  {cat.count} places
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2, pt: 3 }}>
        {STATS.map((stat) => (
          <Grid size={2} key={stat.label} sx={{ textAlign: 'center' }}>
            <Box sx={{ color: 'brandPin.main', mb: 0.5 }}>
              <stat.icon
                sx={{ fontSize: 24, mr: 0.5, verticalAlign: 'middle' }}
              />
              {/* Крупные цифры */}
              <Typography
                variant="h4"
                component="span"
                fontWeight="bold"
                sx={{ verticalAlign: 'middle' }}
              >
                {stat.value}
              </Typography>
            </Box>
            {/* Подписи под цифрами */}
            <Typography variant="caption" color="#fff" display="block">
              {stat.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
