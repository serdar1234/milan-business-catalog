// MobilePhotoGallery.tsx

'use client'; // 🚨 Убедитесь, что 'use client' стоит для использования onClick

import Image from 'next/image';
import { Grid, Box } from '@mui/material'; // Добавим Box, если Grid не поддерживает onClick
import { PhotoLightbox } from '@/layers/04_shared/ui/PhotoLightbox';
import { useState } from 'react';

interface Photo {
  id: number;
  url: string;
  alt: string;
}

interface MobilePhotoProps {
  mobilePreviewPhotos: Photo[];
}

export function MobilePhotoGallery({ mobilePreviewPhotos }: MobilePhotoProps) {
  const [lightboxPhotoId, setLightboxPhotoId] = useState<number | null>(null);

  const previewPhotos = mobilePreviewPhotos.slice(0, 3);

  const handlePhotoClick = (photoId: number) => setLightboxPhotoId(photoId);
  const handleLightboxClose = () => setLightboxPhotoId(null);

  return (
    <Grid
      container
      spacing={{ xs: 1, sm: 2 }}
      sx={{ display: { xs: 'flex', md: 'none' } }}
    >
      {previewPhotos.map((photo) => (
        <Grid
          size={4}
          key={photo.id}
          onClick={() => handlePhotoClick(photo.id)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '1rem',
            height: 'auto',
            aspectRatio: '1/1',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer', // Указываем, что элемент кликабельный
          }}
        >
          <Image
            src={photo.url}
            alt={photo.alt}
            fill={true}
            style={{ objectFit: 'cover' }} // Используем style вместо objectFit
          />
        </Grid>
      ))}
      <PhotoLightbox
        open={!!lightboxPhotoId}
        onClose={handleLightboxClose}
        initialPhotoId={lightboxPhotoId}
        photos={mobilePreviewPhotos} // Предполагаем, что это полный список
      />
    </Grid>
  );
}
