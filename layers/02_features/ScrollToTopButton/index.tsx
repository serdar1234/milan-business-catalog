'use client';

import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const ScrollToTopButton = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        size="small"
        aria-label="scroll back to top"
        sx={{
          position: 'fixed',
          bottom: { xs: '5rem', md: 32 },
          opacity: 0.7,
          '&:hover': { opacity: 1 },
          right: 16,
        }}
        onClick={handleClick}
      >
        <KeyboardArrowUpIcon color="primary" />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton;
