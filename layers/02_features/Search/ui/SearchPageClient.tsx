'use client';

import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { SearchHeader } from '@/layers/01_widgets/SearchHeader/SearchHeader';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { ViewType } from '@/layers/02_features/SearchHeaderVersions';

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
    <Box
      component="main"
      sx={{ bgcolor: 'background.default', minHeight: '100vh' }}
    >
      <SearchHeader
        totalResults={DUMMY_TOTAL_RESULTS}
        currentView={currentView}
        onViewChange={handleViewChange}
        onFilterClick={handleFilterOpen}
        pageTitle={pageTitle}
      />

      <Container maxWidth="lg" sx={{ pt: 3, pb: 6 }}>
        {currentView !== 'map' && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Search Results for: {searchQuery.toLocaleUpperCase()}
            </Typography>
            <Box
              sx={{
                height: 600,
                border: '1px dashed var(--color-border-grey)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Placeholder for SearchListings / Grid
            </Box>
          </Box>
        )}

        {currentView === 'map' && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Search Results for: **{searchQuery}** (Map View)
            </Typography>
            <Box
              sx={{
                height: 600,
                border: '1px solid var(--color-border-grey)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Placeholder for SearchMap
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
