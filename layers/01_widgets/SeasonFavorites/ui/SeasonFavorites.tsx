'use client';

import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { useGetBusinessListQuery } from '@/layers/03_entities/business/api/businessApi';
import { BusinessCard } from '@/layers/02_features/BusinessCard/ui/BusinessCard';

// TODO: Здесь будет импорт реальной BusinessCard
// import { BusinessCard } from '@/layers/02_features/BusinessCard/ui/BusinessCard';

export const SeasonFavorites: React.FC = () => {
  const {
    data: businessList,
    isLoading,
    isError,
  } = useGetBusinessListQuery(undefined);

  if (isLoading) {
    return (
      <Typography sx={{ textAlign: 'center', py: 4 }}>
        Loading seasonal favorites...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography color="error.main" sx={{ textAlign: 'center', py: 4 }}>
        Failed to load featured businesses.
      </Typography>
    );
  }

  const featuredBusinesses = businessList?.slice(0, 3) || [];

  if (featuredBusinesses.length === 0) {
    return null;
  }

  return (
    <Box component="section">
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <WidgetHeader
          title="Season Favorites"
          subtitle="Hand-picked spots perfect for Milano's winter season"
        />

        {/* 3. АДАПТИВНАЯ СЕТКА КАРТОЧЕК */}
        <Grid container spacing={3}>
          {featuredBusinesses.map((business) => (
            <Grid
              key={business.id}
              // Адаптивное расположение:
              // Mobile (xs): занимает всю ширину (колонка)
              // Desktop (md): занимает 1/3 ширины (ряд)
              size={{ xs: 12, md: 4 }}
              sx={{ display: 'flex' }} // Чтобы карточки растягивались на всю высоту
            >
              {/* TODO: Заменить TempBusinessCard на реальный BusinessCard */}
              <BusinessCard business={business} />
            </Grid>
          ))}
        </Grid>

        {/* TODO: Сюда можно добавить кнопку "View All" */}
      </Container>
    </Box>
  );
};
