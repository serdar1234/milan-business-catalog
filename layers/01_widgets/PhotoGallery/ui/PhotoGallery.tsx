import Grid from '@mui/material/Grid';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { MobilePhotoGallery } from './MobilePhotoGallery';
import { DesktopPhotoGallery } from './DesktopPhotoGallery';

export interface Photo {
  id: number;
  url: string;
  filename: string;
}

interface PhotoGalleryProps {
  photos?: Photo[];
}

export const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  return (
    <Grid
      size={12}
      sx={{
        px: { xs: 1, sm: 2, md: 3 },
        py: 3,
        mb: 3,
        bgcolor: 'background.paper',
        position: 'relative',
        borderRadius: '1rem',
        boxShadow: 4,
      }}
    >
      <WidgetHeader title="Photo Gallery" />

      <MobilePhotoGallery mobilePreviewPhotos={photos ?? []} />

      <DesktopPhotoGallery desktopPreviewPhotos={photos ?? []} />
    </Grid>
  );
};
