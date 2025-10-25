import { useState, useEffect, useCallback } from 'react';
import { Dialog, IconButton, Box, Typography, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';

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

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  open,
  onClose,
  initialPhotoId,
  photos,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (open && initialPhotoId != null) {
      const i = photos.findIndex((p) => p.id === initialPhotoId);
      setIndex(i >= 0 ? i : 0);
    }
  }, [open, initialPhotoId, photos]);

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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            height: '100%',
            m: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          color: 'white',
          zIndex: 1500,
          p: 1.5,
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      {/* Image + controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          px: { xs: 0, md: 8 },
          cursor: 'pointer',
        }}
        onClick={onClose}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          disabled={total <= 1}
          sx={{
            position: 'absolute',
            left: { xs: 8, md: 24 },
            color: 'white',
            zIndex: 2100,
            bgcolor: 'rgba(0,0,0,0.4)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Fade in key={current.id} timeout={300}>
          <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
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

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          disabled={total <= 1}
          sx={{
            position: 'absolute',
            right: { xs: 8, md: 24 },
            color: 'white',
            zIndex: 2100,
            bgcolor: 'rgba(0,0,0,0.4)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            p: 1.5,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      {/* Counter */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 0,
          right: 0,
          textAlign: 'center',
          color: 'white',
          zIndex: 1500,
        }}
      >
        <Typography variant="body1">
          {index + 1} / {total}
        </Typography>
      </Box>
    </Dialog>
  );
};
