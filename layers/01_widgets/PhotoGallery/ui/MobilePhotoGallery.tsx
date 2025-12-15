'use client';

import { useState } from 'react';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import { PhotoLightbox } from '@/layers/04_shared/ui/PhotoLightbox';

import { Photo } from './PhotoGallery';

interface MobilePhotoProps {
  mobilePreviewPhotos: Photo[];
}

export function MobilePhotoGallery({ mobilePreviewPhotos }: MobilePhotoProps) {
  const [lightboxPhotoId, setLightboxPhotoId] = useState<string | null>(null);

  const previewPhotos = mobilePreviewPhotos.slice(0, 3);

  const handlePhotoClick = (photoId: string) => setLightboxPhotoId(photoId);
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
          key={photo.id || photo.url}
          onClick={() => handlePhotoClick(photo.url)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '1rem',
            height: 'auto',
            aspectRatio: '1/1',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <Image
            src={photo.url}
            alt={photo.filename}
            fill={true}
            sizes="30vw"
            style={{ objectFit: 'cover' }}
          />
        </Grid>
      ))}
      {!!lightboxPhotoId && (
        <PhotoLightbox
          open={!!lightboxPhotoId}
          onClose={handleLightboxClose}
          initialPhotoId={lightboxPhotoId}
          photos={mobilePreviewPhotos}
        />
      )}
    </Grid>
  );
}
