'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ViewType } from '@/layers/02_features/SearchHeaderVersions';
import { SearchHeader } from '@/layers/01_widgets/SearchHeader/SearchHeader';
import { FilterPanel } from '@/layers/02_features/FilterPanel/FilterPanel';
import { BusinessList } from '@/layers/01_widgets/BusinessList/BusinessList';
import { useToggleDrawer } from '@/layers/04_shared/hooks/useToggleDrawer';
import { useSearchResults } from '@/layers/04_shared/hooks/useSearchResults';
import { MapContainerClient } from '@/layers/02_features/Map';
import styles from './SearchPageClient.module.css';
import { Business, Meta } from '@/layers/04_shared/types/types';
import { LanguageCode } from '@/layers/04_shared/configs/settings';

interface SearchPageClientProps {
  searchQuery: string;
  initialView: ViewType;
  pageTitle: string;
  initialResult: { data: Business[]; meta: Meta };
  lang: LanguageCode;
}

export default function SearchPageClient({
  searchQuery,
  initialView,
  pageTitle,
  initialResult,
  lang,
}: SearchPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { open, toggleDrawer, setOpen } = useToggleDrawer();

  const [currentView, setCurrentView] = useState<ViewType>(initialView);

  // Extract filter parameters from URL
  const ratingMin =
    searchParams.get('rating_min') || searchParams.get('rating') || undefined;
  const categoryId = searchParams.get('category_id') || undefined;
  const sort = searchParams.get('sort') || undefined;

  const { page, setPage, businessList, meta, isLoading, isError } =
    useSearchResults(
      searchQuery,
      lang,
      initialResult,
      ratingMin,
      categoryId,
      sort,
    );
  const total_results = meta?.pagination?.total_count || 0;

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
        totalResults={total_results}
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
            <FilterPanel meta={meta} />
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
                <BusinessList
                  page={page}
                  setPage={setPage}
                  businessList={businessList}
                  meta={meta}
                  isLoading={isLoading}
                  isError={isError}
                  cols={currentView === 'list' ? 1 : 2}
                />
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
          <FilterPanel meta={meta} />
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
