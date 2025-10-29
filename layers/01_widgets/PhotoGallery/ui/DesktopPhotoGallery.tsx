'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Grid, Typography, Box } from '@mui/material';
import styles from './PhotoGallery.module.css';
import Link from 'next/link';
import { PhotoLightbox } from '@/layers/04_shared/ui/PhotoLightbox';

interface DesktopPreviewPhotos {
  desktopPreviewPhotos: {
    id: number;
    url: string;
    alt: string;
  }[];
}

export function DesktopPhotoGallery({
  desktopPreviewPhotos,
}: DesktopPreviewPhotos) {
  const [lightboxPhotoId, setLightboxPhotoId] = useState<number | null>(null);
  const params = useParams();
  const firstPhoto = desktopPreviewPhotos[0];
  const photos = desktopPreviewPhotos.slice(1, 4);
  const numberOfPhotos = desktopPreviewPhotos.length;

  const handlePhotoClick = (photoId: number) => {
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
        onClick={() => handlePhotoClick(firstPhoto.id)}
      >
        <Image
          src={firstPhoto.url}
          alt={firstPhoto.alt}
          fill={true}
          sizes="66vw"
          style={{ objectFit: 'cover' }}
        />
      </Grid>
      <Grid size={4} rowGap={2} display={'flex'} flexDirection={'column'}>
        {photos.map((photo) => (
          <Grid key={photo.id} className={styles['image-wrapper']}>
            <Box
              onClick={() => handlePhotoClick(photo.id)}
              sx={{ cursor: 'pointer', height: '100%', position: 'relative' }}
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill={true}
                sizes="33vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {numberOfPhotos > 4 && (
        <Grid size={12}>
          <Typography variant="body1" color="brandAccent.main">
            <Link href={`./${params.id}/gallery/`}>
              View all {numberOfPhotos} photos
            </Link>
          </Typography>
        </Grid>
      )}
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
