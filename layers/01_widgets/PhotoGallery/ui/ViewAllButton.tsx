'use client';

import { useParams } from 'next/navigation';
import { Typography } from '@mui/material';
import Link from 'next/link';

export default function ViewAllButton({
  photolength,
}: {
  photolength: number;
}) {
  const params = useParams();

  return (
    <Typography
      variant="body1"
      color="brandAccent.main"
      sx={{
        display: { xs: 'block', md: 'none' },
        position: 'absolute',
        top: '2.5rem',
        right: { xs: '0.5rem', sm: '1rem' },
      }}
    >
      <Link href={`./${params.id}/gallery/`}>View all ({photolength})</Link>
    </Typography>
  );
}
