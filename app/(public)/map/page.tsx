'use client';

import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CategoryBusinessList } from '@/layers/01_widgets/CategoryBusinessList/CategoryBusinessList';
import { useToggleDrawer } from '@/layers/04_shared/hooks/useToggleDrawer';
import { FilterPanel } from '@/layers/02_features/FilterPanel/FilterPanel';

const MapContainerClient = dynamic(
  () =>
    import('@/layers/02_features/Map/MapContainerClient').then(
      (mod) => mod.MapContainerClient,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
          backgroundColor: 'var(--color-secondary-main)',
        }}
      >
        <CircularProgress size={60} color="primary" />
      </div>
    ),
  },
);

export default function MapPage() {
  const { open, setOpen, toggleDrawer } = useToggleDrawer();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const handleFilterToggle = () => {
    setOpen(true);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          position: { xs: 'fixed', md: 'static' },
          flexDirection: { xs: 'column', md: 'row' },
          height: 'calc(100vh - 64px)',
          width: '100%',
        }}
      >
        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '1 1 60%' },
          }}
        >
          <MapContainerClient
            showMapControls
            onFilterClick={handleFilterToggle}
          />
        </Box>

        <Box
          sx={{
            flex: { xs: '1 1 auto', md: '1 1 40%' },
            height: { xs: '80%', md: 'auto' },
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          <CategoryBusinessList cols={1} isSmall={isSmall} />
        </Box>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <Box
          padding={2}
          sx={{
            width: 'clamp(40vw, 300px, 80vw)',
            overflowX: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FilterPanel />
          <Button
            variant="contained"
            onClick={toggleDrawer(false)}
            color="statusFeatured"
            sx={{ alignSelf: 'flex-end' }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
