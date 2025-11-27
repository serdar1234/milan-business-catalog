import { Grid } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { MobilePhotoGallery } from './MobilePhotoGallery';
import { DesktopPhotoGallery } from './DesktopPhotoGallery';
import ViewAllButton from './ViewAllButton';

const MOCK_PHOTOS = [
  { id: 8, url: '/business.jpg', filename: 'Business' },
  { id: 1, url: '/d1.jpg', filename: 'Interior_view' },
  { id: 2, url: '/d2.jpg', filename: 'Plate_of_food' },
  { id: 3, url: '/d3.jpg', filename: 'Canal view' },
  { id: 4, url: '/d4.jpg', filename: 'Bar area' },
  { id: 5, url: '/d5.jpg', filename: 'Dinner table' },
  { id: 6, url: '/d6.jpg', filename: 'Kitchen' },
  { id: 7, url: '/d7.jpg', filename: 'Dessert' },
];

export interface Photo {
  id: number;
  url: string;
  filename: string;
}

interface PhotoGalleryProps {
  photos?: Photo[];
}

export const PhotoGallery = ({ photos = MOCK_PHOTOS }: PhotoGalleryProps) => {
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
      <ViewAllButton photolength={photos.length} />

      <MobilePhotoGallery mobilePreviewPhotos={photos} />

      <DesktopPhotoGallery desktopPreviewPhotos={photos} />
    </Grid>
  );
};
