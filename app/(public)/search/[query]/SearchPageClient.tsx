'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { SearchHeader } from '@/layers/01_widgets/SearchHeader/SearchHeader';

type ViewType = 'list' | 'map';

interface SearchPageClientProps {
  searchQuery: string;
  initialView: ViewType;
}

export default function SearchPageClient({
  searchQuery,
  initialView,
}: SearchPageClientProps) {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<ViewType>(initialView);

  const DUMMY_TOTAL_RESULTS = 47;

  const handleViewChange = (newView: ViewType) => {
    setCurrentView(newView);
    router.push(`?view=${newView}`, { scroll: false });
  };

  const handleFilterOpen = () => {
    console.log('Open Mobile Filters Modal');
  };

  const pageTitle = searchQuery || 'All Businesses';

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
        {currentView === 'list' && (
          <Box
            sx={{
              height: 600,
              border: '1px dashed #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Search Results for: **{searchQuery}** (List View)
          </Box>
        )}

        {currentView === 'map' && (
          <Box
            sx={{
              height: 600,
              border: '1px solid #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Search Results for: **{searchQuery}** (Map View)
          </Box>
        )}
      </Container>
    </Box>
  );
}
