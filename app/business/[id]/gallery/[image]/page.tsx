'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function ImagePage() {
  const { image }: { image: string } = useParams();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        m: 4,
      }}
    >
      <Typography variant="h4" component={'h2'} sx={{ mb: 2 }}>
        Photo Gallery
      </Typography>
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '50%' }}>
        <Image
          src={`/${image}`}
          alt={image}
          fill
          style={{ objectFit: 'contain' }}
        />
      </Box>
    </Box>
  );
}
