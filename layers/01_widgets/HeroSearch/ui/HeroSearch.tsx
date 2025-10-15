'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Image from 'next/image';
import { SearchForm } from '@/layers/02_features/Search/ui/SearchForm';

const HERO_IMAGE_URL = '/mockHero.jpg';

export const HeroSearch: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: { xs: 320, md: 600 },
        maxHeight: { xs: 320, md: 600 },
      }}
    >
      <Image
        src={HERO_IMAGE_URL}
        alt="Milan Cityscape"
        fill
        priority
        style={{ objectFit: 'cover', filter: 'brightness(0.5)' }}
      />
      <Container
        sx={{
          position: 'relative',
          top: '40%',
          zIndex: 1,
          height: '60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flext-end',
        }}
      >
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Typography
            variant="h5"
            component="h1"
            color="white"
            fontWeight="bold"
          >
            Discover Milano&apos;s Hidden Gems
          </Typography>
          <Typography variant="body1" color="white" mb={'1rem'}>
            Perfect spots for your winter adventure
          </Typography>
          <SearchForm />
        </Box>
      </Container>
    </Box>
  );
};
