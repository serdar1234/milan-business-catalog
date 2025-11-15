'use client';

import { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { SearchHeader } from '@/layers/01_widgets/SearchHeader/SearchHeader';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { ViewType } from '@/layers/02_features/SearchHeaderVersions';
import styles from './SearchPageClient.module.css';
import { SearchFilters } from '@/layers/02_features/SearchFilters/SearchFilters';

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

  const [currentView, setCurrentView] = useState<ViewType>(initialView);
  const DUMMY_TOTAL_RESULTS = 47;

  const handleViewChange = (newView: ViewType) => {
    setCurrentView(newView);

    const params = new URLSearchParams(searchParams.toString());
    params.set('view', newView);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilterOpen = () => {
    console.log(`Open Mobile Filters Modal for query: ${searchQuery}`);
  };

  return (
    <>
      <SearchHeader
        totalResults={DUMMY_TOTAL_RESULTS}
        currentView={currentView}
        onViewChange={handleViewChange}
        onFilterClick={handleFilterOpen}
        pageTitle={pageTitle}
      />

      <Container component={'section'} maxWidth="lg" sx={{ pt: 3, pb: 6 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Search Results for: {searchQuery.toLocaleUpperCase()}
        </Typography>
        <Grid container spacing={1}>
          <Grid size={3} component={'aside'}>
            <SearchFilters />
          </Grid>
          <Grid size={5} component={'section'}>
            {currentView !== 'map' && (
              <Box
                sx={{
                  height: 600,
                  border: '2px solid var(--color-brand-accent)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignBoxs: 'center',
                }}
              >
                Placeholder for SearchListings / Grid
              </Box>
            )}

            {currentView === 'map' && (
              <Box
                sx={{
                  height: 600,
                  border: '2px solid var(--color-brand-accent)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignBoxs: 'center',
                }}
              >
                Placeholder for SearchMap
              </Box>
            )}
          </Grid>
          <Grid size={4} component={'section'} aria-label="Map">
            <Box className={styles['map-container']}>MAP</Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
