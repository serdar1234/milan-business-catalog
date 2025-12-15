'use client';

import { useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styles from './PhotoGallery.module.css';
import { PhotoLightbox } from '@/layers/04_shared/ui/PhotoLightbox';
import { Photo } from './PhotoGallery';

interface DesktopPreviewPhotos {
  desktopPreviewPhotos: Photo[];
}

export function DesktopPhotoGallery({
  desktopPreviewPhotos,
}: DesktopPreviewPhotos) {
  const [lightboxPhotoId, setLightboxPhotoId] = useState<string | null>(null);
  if (desktopPreviewPhotos.length === 0) return null;

  const firstPhoto = desktopPreviewPhotos[0];
  const photos = desktopPreviewPhotos.slice(1, 4);

  const handlePhotoClick = (photoId: string) => {
    setLightboxPhotoId(photoId);
  };

  const handleLightboxClose = () => {
    setLightboxPhotoId(null);
  };

  return (
    <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Grid
        size={8}
        className={styles['image-wrapper']}
        onClick={() => handlePhotoClick(firstPhoto.url)}
        sx={{ cursor: 'pointer', position: 'relative' }}
      >
        <Image
          src={firstPhoto.url || ''}
          alt={firstPhoto.filename || ''}
          fill={true}
          sizes="66vw"
          style={{ objectFit: 'cover' }}
        />
      </Grid>
      <Grid size={4} rowGap={2} display={'flex'} flexDirection={'column'}>
        {photos.map((photo) => (
          <Grid key={photo.id || photo.url} className={styles['image-wrapper']}>
            <Box
              onClick={() => handlePhotoClick(photo.url)}
              sx={{ cursor: 'pointer', height: '100%', position: 'relative' }}
            >
              <Image
                src={photo.url}
                alt={photo.filename}
                fill={true}
                sizes="33vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {!!lightboxPhotoId && (
        <PhotoLightbox
          open={!!lightboxPhotoId}
          onClose={handleLightboxClose}
          initialPhotoId={lightboxPhotoId}
          photos={desktopPreviewPhotos}
        />
      )}
    </Grid>
  );
}
