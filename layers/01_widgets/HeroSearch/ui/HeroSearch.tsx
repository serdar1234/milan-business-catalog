'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Image from 'next/image';
import { SearchForm } from '@/layers/02_features/Search/ui/SearchForm';
import { HeroDesktopInfo } from './HeroDesktopInfo';

const HERO_IMAGE_URL = '/mockHero.jpg';

export const HeroSearch: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: { xs: 320, md: 600 },
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
          top: { xs: '40%', md: 0 },
          zIndex: 1,
          height: { xs: '60%', md: '100%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: { xs: 'flext-end', md: 'center' },
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

        {/* Desktop info block */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <HeroDesktopInfo />
        </Box>
      </Container>
    </Box>
  );
};
