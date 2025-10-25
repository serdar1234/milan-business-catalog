'use client';

import { useState } from 'react';
import { ImageList, ImageListItem, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { PhotoLightbox } from './PhotoLightbox';

const MOCK_PHOTOS = [
  { id: 1, url: '/d1.jpg', alt: 'Interior view' },
  { id: 2, url: '/d2.jpg', alt: 'Plate of food' },
  { id: 3, url: '/d3.jpg', alt: 'Canal view' },
  { id: 4, url: '/d4.jpg', alt: 'Bar area' },
  { id: 5, url: '/d5.jpg', alt: 'Dinner table' },
  { id: 6, url: '/d6.jpg', alt: 'Kitchen' },
  { id: 7, url: '/d7.jpg', alt: 'Dessert' },
  { id: 8, url: '/d8.jpg', alt: 'Facade' },
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
  const [lightboxPhotoId, setLightboxPhotoId] = useState<number | null>(null);

  // 🚨 Обработчик клика
  const handlePhotoClick = (photoId: number) => {
    setLightboxPhotoId(photoId);
  };
  const handleLightboxClose = () => {
    setLightboxPhotoId(null);
  };
  return (
    <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: 'lg', mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        All Photos of {businessName} ({photos.length})
      </Typography>

      <ImageList cols={3} gap={8}>
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
                objectFit="cover"
              />
            </Box>
          </ImageListItem>
        ))}
      </ImageList>
      <PhotoLightbox
        open={!!lightboxPhotoId}
        onClose={handleLightboxClose}
        initialPhotoId={lightboxPhotoId}
        photos={photos}
      />
    </Box>
  );
};
