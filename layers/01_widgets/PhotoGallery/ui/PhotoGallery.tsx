import { Typography, Grid } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import Image from 'next/image';
import Link from 'next/link';

import styles from './PhotoGallery.module.css';

// Мок-данные для галереи
const MOCK_PHOTOS = [
  { id: 1, url: '/d1.jpg', alt: 'Interior view' },
  { id: 2, url: '/d2.jpg', alt: 'Plate of food' },
  { id: 3, url: '/d3.jpg', alt: 'Canal view' },
  { id: 4, url: '/d4.jpg', alt: 'Bar area' },
  { id: 5, url: '/d5.jpg', alt: 'Dinner table' },
];

interface Photo {
  id: number;
  url: string;
  alt: string;
}

interface PhotoGalleryProps {
  photos?: Photo[];
}

export const PhotoGallery = ({ photos = MOCK_PHOTOS }: PhotoGalleryProps) => {
  const mobilePreviewPhotos = photos.slice(0, 3);
  const firstPhoto = photos[0];
  const desktopPreviewPhotos = photos.slice(1, 4);

  return (
    <Grid
      size={{ xs: 12, md: 8 }}
      sx={{
        px: 3,
        py: 3,
        bgcolor: { xs: 'transparent', md: 'background.paper' },
        position: 'relative',
        outline: '2px solid salmon',
        borderRadius: '1rem',
      }}
    >
      <WidgetHeader title="Photo Gallery" />
      <Typography
        variant="body1"
        color="brandAccent.main"
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'absolute',
          top: '2.5rem',
          right: '1.5rem',
        }}
      >
        <Link href="#">View all ({photos.length})</Link>
      </Typography>
      <Grid container spacing={2} sx={{ display: { xs: 'flex', md: 'none' } }}>
        {/* Мобильная версия (простой layout) */}
        {mobilePreviewPhotos.map((photo) => (
          <Grid
            size={4}
            key={photo.id}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '1rem',
              height: 'auto',
              aspectRatio: '1/1',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill={true}
              objectFit="cover"
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
        {/* Десктопная версия (сложный layout) */}
        <Grid size={8} className={styles['image-wrapper']}>
          <Image
            src={firstPhoto.url}
            alt={firstPhoto.alt}
            fill={true}
            objectFit="cover"
          />
        </Grid>
        <Grid size={4} rowGap={2} display={'flex'} flexDirection={'column'}>
          {desktopPreviewPhotos.map((photo) => (
            <Grid key={photo.id} className={styles['image-wrapper']}>
              <Image
                src={photo.url}
                alt={photo.alt}
                fill={true}
                objectFit="cover"
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
