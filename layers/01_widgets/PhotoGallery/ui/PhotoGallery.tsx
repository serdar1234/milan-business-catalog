'use client';

import { Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { MobilePhotoGallery } from './MobilePhotoGallery';
import { DesktopPhotoGallery } from './DesktopPhotoGallery';
import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';

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
  const isMobile = useViewportWidth();
  const mobilePreviewPhotos = photos.slice(0, 3);
  const desktopPreviewPhotos = photos.slice(0, 4);

  return (
    <Grid
      size={12}
      sx={{
        px: { xs: 1, sm: 2, md: 3 },
        py: 3,
        bgcolor: 'background.paper',
        position: 'relative',
        borderRadius: '1rem',
        boxShadow: 4,
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
          right: { xs: '0.5rem', sm: '1rem' },
        }}
      >
        <Link href="#">View all ({photos.length})</Link>
      </Typography>
      {isMobile && (
        <MobilePhotoGallery mobilePreviewPhotos={mobilePreviewPhotos} />
      )}
      {isMobile === false && (
        <DesktopPhotoGallery desktopPreviewPhotos={desktopPreviewPhotos} />
      )}
    </Grid>
  );
};
