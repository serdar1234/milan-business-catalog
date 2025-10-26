'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Dialog,
  IconButton,
  Box,
  Typography,
  Fade,
  Backdrop,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import styles from './ui.module.css';
import { ArrowButton } from '@/layers/04_shared/ui/ArrowButton';

interface Photo {
  id: number;
  url: string;
  alt: string;
}

interface PhotoLightboxProps {
  open: boolean;
  onClose: () => void;
  initialPhotoId: number | null;
  photos: Photo[];
}

const SWIPE_THRESHOLD = 50;

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  open,
  onClose,
  initialPhotoId,
  photos,
}) => {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);
  useEffect(() => {
    if (open && initialPhotoId != null) {
      const i = photos.findIndex((p) => p.id === initialPhotoId);
      setIndex(i >= 0 ? i : 0);
    }
  }, [open, initialPhotoId, photos]);

  // --- (Touch Handlers) ---

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX.current;

    if (Math.abs(diffX) > SWIPE_THRESHOLD) {
      if (diffX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  const total = photos.length;
  const current = photos[index];

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === 'ArrowRight') handleNext();
      if (event.key === 'ArrowLeft') handlePrev();
      if (event.key === 'Escape') onClose();
    },
    [open, handleNext, handlePrev, onClose],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener('keydown', handleKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open || !current || total === 0) return null;

  return (
    <Backdrop open={open} onClick={onClose}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        slotProps={{
          paper: {
            sx: {
              width: '100%',
              height: '100%',
              m: 0,
              bgcolor: 'transparent',
            },
          },
        }}
      >
        <IconButton onClick={onClose} className={styles['close-btn']}>
          <CloseIcon fontSize="large" />
        </IconButton>
        {/* Image + controls */}
        <Box
          sx={{
            px: { xs: 0, md: 8 },
            '.MuiIconButton-root': {
              display: { xs: 'none', md: 'flex' },
            },
          }}
          className={styles['image-box']}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={onClose}
        >
          <ArrowButton fn={handlePrev} total={total} direction="left">
            <ArrowBackIosIcon />
          </ArrowButton>

          <Fade in key={current.id} timeout={300}>
            <Box className={styles['image-wrapper']}>
              <Image
                key={current.id}
                src={current.url}
                alt={current.alt}
                fill
                style={{ objectFit: 'contain' }}
                sizes="90vw"
              />
            </Box>
          </Fade>

          <ArrowButton fn={handleNext} total={total} direction="right">
            <ArrowForwardIosIcon />
          </ArrowButton>
        </Box>
        {/* Counter */}
        <Box className={styles['counter']}>
          <Typography variant="body1">
            {index + 1} / {total}
          </Typography>
        </Box>
      </Dialog>
    </Backdrop>
  );
};
