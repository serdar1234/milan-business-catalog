'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ImageList,
  ImageListItem,
  Box,
  Typography,
  Button,
} from '@mui/material';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PhotoLightbox } from '../../../04_shared/ui/PhotoLightbox';
import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';

const MOCK_PHOTOS = [
  { id: 1, url: '/d1.jpg', alt: 'Interior view' },
  { id: 2, url: '/d2.jpg', alt: 'Plate of food' },
  { id: 3, url: '/d3.jpg', alt: 'Canal view' },
  { id: 4, url: '/d4.jpg', alt: 'Bar area' },
  { id: 5, url: '/d5.jpg', alt: 'Dinner table' },
  { id: 6, url: '/d6.jpg', alt: 'Kitchen' },
  { id: 7, url: '/d7.jpg', alt: 'Dessert' },
  { id: 8, url: '/business.jpg', alt: 'Business' },
];

interface Photo {
  id: number;
  url: string;
  alt: string;
}

interface BusinessImagesGalleryProps {
  photos?: Photo[];
  businessName: string;
}

export const Gallery: React.FC<BusinessImagesGalleryProps> = ({
  photos = MOCK_PHOTOS,
  businessName,
}) => {
  const isMobile = useViewportWidth();
  const [lightboxPhotoId, setLightboxPhotoId] = useState<number | null>(null);
  const router = useRouter();
  const handlePhotoClick = (photoId: number) => {
    setLightboxPhotoId(photoId);
  };
  const handleLightboxClose = () => {
    setLightboxPhotoId(null);
  };
  return (
    <Box sx={{ p: 3, mx: 'auto' }} maxWidth="lg">
      <Box>
        <Button
          startIcon={<ArrowBackIcon color="inherit" />}
          onClick={() => router.back()}
          color="brandPin"
          variant="outlined"
          sx={{ textTransform: 'none', px: '1rem' }}
        >
          Go back to {businessName}
        </Button>
      </Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        All Photos of {businessName} ({photos.length})
      </Typography>

      <ImageList cols={isMobile ? 3 : 4} gap={8}>
        {photos.map((item) => (
          <ImageListItem key={item.id}>
            <Box
              sx={{
                position: 'relative',
                paddingTop: `100%`,
                overflow: 'hidden',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handlePhotoClick(item.id)}
            >
              <Image
                src={item.url}
                alt={item.alt}
                fill={true}
                sizes="33vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </ImageListItem>
        ))}
      </ImageList>
      {!!lightboxPhotoId && (
        <PhotoLightbox
          open={!!lightboxPhotoId}
          onClose={handleLightboxClose}
          initialPhotoId={lightboxPhotoId}
          photos={photos}
        />
      )}
    </Box>
  );
};
