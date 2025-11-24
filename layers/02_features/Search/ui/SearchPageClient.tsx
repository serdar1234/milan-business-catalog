'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SearchHeader } from '@/layers/01_widgets/SearchHeader/SearchHeader';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { ViewType } from '@/layers/02_features/SearchHeaderVersions';
import styles from './SearchPageClient.module.css';
import { FilterPanel } from '@/layers/02_features/FilterPanel/FilterPanel';
import { CategoryBusinessList } from '@/layers/01_widgets/CategoryBusinessList/CategoryBusinessList';
import { useToggleDrawer } from '@/layers/04_shared/hooks/useToggleDrawer';

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
          width: '100%',
          backgroundColor: 'var(--color-secondary-main)',
        }}
      >
        <CircularProgress size={60} color="primary" />
      </div>
    ),
  },
);

interface SearchPageClientProps {
  searchQuery: string;
  initialView: ViewType;
  pageTitle: string;
}

export default function SearchPageClient({
  searchQuery,
  initialView,
  pageTitle,
}: SearchPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { open, toggleDrawer, setOpen } = useToggleDrawer();

  const [currentView, setCurrentView] = useState<ViewType>(initialView);
  const DUMMY_TOTAL_RESULTS = 47;

  const handleViewChange = (newView: ViewType) => {
    setCurrentView(newView);

    const params = new URLSearchParams(searchParams.toString());
    params.set('view', newView);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleAllFiltersOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <SearchHeader
        totalResults={DUMMY_TOTAL_RESULTS}
        currentView={currentView}
        onViewChange={handleViewChange}
        onAllFilterClick={handleAllFiltersOpen}
        pageTitle={pageTitle}
      />

      <Container component={'section'} maxWidth="lg" sx={{ pt: 3, pb: 6 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Search Results for: {searchQuery.toLocaleUpperCase()}
        </Typography>
        <Grid container spacing={1}>
          <Grid
            size={3}
            component={'aside'}
            aria-label="Filters"
            display={{ xs: 'none', md: 'block' }}
          >
            <FilterPanel />
          </Grid>
          <Grid
            size={{ xs: 12, md: 9, lg: 5 }}
            component={'section'}
            aria-label="Business list"
            display={currentView === 'map' ? 'none' : 'block'}
          >
            {currentView !== 'map' && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignBoxs: 'center',
                }}
              >
                <CategoryBusinessList cols={currentView === 'list' ? 1 : 2} />
              </Box>
            )}
          </Grid>
          <Grid
            size={{ md: currentView === 'map' ? 9 : 4, xs: 12 }}
            component={'section'}
            aria-label="Map"
            display={{
              xs: currentView === 'map' ? 'block' : 'none',
              lg: 'block',
            }}
          >
            <Box className={styles['map-container']} boxShadow={4}>
              <MapContainerClient showMapControls />
            </Box>
          </Grid>
        </Grid>
      </Container>

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
