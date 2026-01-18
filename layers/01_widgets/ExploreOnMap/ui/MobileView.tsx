import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import MapIcon from '@mui/icons-material/Map';
import Link from 'next/link';
import React from 'react';
import { fetchCategories } from '@/layers/04_shared/utils/helpers.server';

type MobileViewFn = () => Promise<React.ReactElement>;
export const MobileView: MobileViewFn = async function () {
  let cats = null;

  try {
    cats = await fetchCategories(8);
  } catch (error) {
    console.error('Error fetching categories for MobileView:', error);
  }

  const filterButtons = cats
    ? ['All', ...cats.slice(0, 3).map((cat) => cat.name)]
    : ['All'];

  return (
    <Container sx={{ display: { xs: 'block', md: 'none' } }}>
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(45deg, var(--color-brand-primary), var(--color-text-primary))',
          p: 3,
          borderRadius: 2,
        }}
        role="region"
        aria-label="Explore on Map - Mobile View"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="var(--color-surface)"
              mb={0.5}
              component="h2"
            >
              Explore on Map
            </Typography>
            <Typography
              variant="body2"
              color="rgb(from var(--color-surface) r g b / 0.7)"
            >
              Find the best spots near your current location.
            </Typography>
          </Box>

          <Button
            component={Link}
            variant="contained"
            color="surface"
            href="/map"
            sx={{
              px: 2,
              ml: 4,
              textTransform: 'capitalize',
              height: '3rem',
              textWrap: { xs: 'auto', sm: 'nowrap' },
            }}
            startIcon={<MapIcon />}
            aria-label="Open full map view"
          >
            Open map
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            py: 1,
            flexWrap: 'wrap',
          }}
          role="navigation"
          aria-label="Category filters"
        >
          {/* Show only 3 filter options: 'All' and the first two categories */}
          {filterButtons.map((label) => (
            <Chip
              key={label}
              label={label}
              size="small"
              sx={{
                flexShrink: 0,
                bgcolor: 'rgb(from var(--color-surface) r g b / 0.15)',
                color: 'background.paper',
                fontWeight: 'medium',
              }}
              aria-label={`Filter by ${label.toLowerCase()}`}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};
