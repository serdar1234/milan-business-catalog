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
      component={'figure'}
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
        sizes="100vw"
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
          <Box component={'figcaption'}>
            <Typography
              variant="h5"
              component="h1"
              color="brandAccent.contrastText"
              fontWeight="bold"
            >
              Discover Milano&apos;s Hidden Gems
            </Typography>
          </Box>
          <Typography
            variant="body1"
            color="brandAccent.contrastText"
            mb={'1rem'}
          >
            Perfect spots for your winter adventure
          </Typography>
          <SearchForm />
        </Box>

        <HeroDesktopInfo />
      </Container>
    </Box>
  );
};
