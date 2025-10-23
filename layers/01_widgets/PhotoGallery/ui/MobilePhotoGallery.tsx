import Image from 'next/image';
import { Grid } from '@mui/material';
interface MobilePhotoProps {
  mobilePreviewPhotos: {
    id: number;
    url: string;
    alt: string;
  }[];
}

export function MobilePhotoGallery({ mobilePreviewPhotos }: MobilePhotoProps) {
  return (
    <Grid
      container
      spacing={{ xs: 1, sm: 2 }}
      sx={{ display: { xs: 'flex', md: 'none' } }}
    >
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
  );
}
