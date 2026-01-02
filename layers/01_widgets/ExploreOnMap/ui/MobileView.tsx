import { Box, Typography, Button, Chip, Container } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import Link from 'next/link';
import React from 'react';
import { fetchCategories } from '@/layers/04_shared/utils/helpers.server';

type MobileViewFn = () => Promise<React.ReactElement>;
export const MobileView: MobileViewFn = async function () {
  const cats = await fetchCategories(8);
  return (
    <Container sx={{ display: { xs: 'block', md: 'none' } }}>
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(45deg, var(--color-brand-primary), var(--color-text-primary))',
          p: 3,
          borderRadius: 2,
        }}
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
        >
          {cats &&
            cats.map((cat) => (
              <Chip
                key={cat.slug}
                label={cat.name}
                size="small"
                sx={{
                  flexShrink: 0,
                  bgcolor: 'rgb(from var(--color-surface) r g b / 0.15)',
                  color: 'background.paper',
                  fontWeight: 'medium',
                }}
              />
            ))}
        </Box>
      </Box>
    </Container>
  );
};
