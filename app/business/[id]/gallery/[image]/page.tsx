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
      <Image src={`/${image}`} alt={image} width={500} height={500} />
    </Box>
  );
}
