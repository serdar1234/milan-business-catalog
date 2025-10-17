'use client';

import { Box, Container, Grid } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { DistrictCard } from '@/layers/02_features/DistrictCard/ui/DistrictCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import styles from './ExploreDistricts.module.css';
import { DISTRICTS } from './mockDistricts';

export const ExploreDistricts: React.FC = () => {
  return (
    <Box component="section" className={styles['explore-districts']}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <WidgetHeader
          title="Explore Milano Districts"
          subtitle="Discover the unique character and hidden gems of the city's best neighborhoods."
        />

        {/* === desktop (Grid 2x2) === */}
        <Grid
          container
          spacing={3}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          {DISTRICTS.slice(0, 4).map((district) => (
            <Grid key={district.name} size={6}>
              <DistrictCard district={district} />
            </Grid>
          ))}
        </Grid>

        {/* === Mobile carousel === */}
        <Box
          className={styles.swiperWrapper}
          sx={{
            display: { xs: 'block', md: 'none' },
            mx: -2,
          }}
        >
          <Swiper
            modules={[Navigation, A11y]}
            slidesPerView={'auto'}
            spaceBetween={16}
            navigation={true}
            style={{ padding: '0 1rem', overflow: 'initial' }}
          >
            {DISTRICTS.map((district) => (
              <SwiperSlide
                key={district.name}
                style={{ width: '70%', minWidth: '15rem' }}
              >
                <DistrictCard district={district} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};
