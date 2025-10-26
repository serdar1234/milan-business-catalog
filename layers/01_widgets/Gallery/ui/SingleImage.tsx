'use client';

import { Backdrop } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';

export const SingleImage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Backdrop open={open} onClick={handleClose}>
      <Image
        src={''}
        alt={'current.alt'}
        fill
        style={{ objectFit: 'contain' }}
        sizes="90vw"
      />
    </Backdrop>
  );
};
