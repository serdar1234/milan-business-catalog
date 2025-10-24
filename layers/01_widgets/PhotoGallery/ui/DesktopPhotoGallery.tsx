import Image from 'next/image';
import { Grid, Typography } from '@mui/material';
import styles from './PhotoGallery.module.css';
import Link from 'next/link';

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
  const firstPhoto = desktopPreviewPhotos[0];
  const photos = desktopPreviewPhotos.slice(1);
  const numberOfPhotos = desktopPreviewPhotos.length;

  return (
    <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Grid size={8} className={styles['image-wrapper']}>
        <Image
          src={firstPhoto.url}
          alt={firstPhoto.alt}
          fill={true}
          objectFit="cover"
        />
      </Grid>
      <Grid size={4} rowGap={2} display={'flex'} flexDirection={'column'}>
        {photos.map((photo) => (
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

      {numberOfPhotos > 4 && (
        <Grid size={12}>
          <Typography variant="body1" color="brandAccent.main">
            <Link href="#">View all {numberOfPhotos} photos</Link>
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
