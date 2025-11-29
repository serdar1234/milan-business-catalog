import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ExploreIcon from '@mui/icons-material/Explore';
import MapIcon from '@mui/icons-material/Map';
import PlaceIcon from '@mui/icons-material/Place';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import Link from 'next/link';
import styles from './HeroDesktopInfo.module.css';
import { fetchCategories } from '@/layers/04_shared/utils/helpers.server';
import { SvgIconComponent } from '@mui/icons-material';

const icons: SvgIconComponent[] = [
  LocalBarIcon,
  LocalCafeIcon,
  RestaurantIcon,
  ColorLensIcon,
];

export async function HeroDesktopInfo() {
  const cats = await fetchCategories(4);
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={4}>
        {/* === LEFT COLUMN === */}
        <Grid size={7}>
          <Box component={'figcaption'}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              sx={{ mb: '1.5rem', color: 'brandAccent.contrastText' }}
            >
              Discover Milano&apos;s
              <Box sx={{ color: 'brandAccent.main' }}>Winter Magic</Box>
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: 'brandAccent.contrastText',
              opacity: 0.8,
              maxWidth: '60ch',
            }}
          >
            From canal-side aperitivo bars to cozy trattorias, explore the best
            of Milano this winter season. Find your perfect spot for warming up
            with authentic Italian experiences.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              component={Link}
              href="/search?q=milano"
              className={styles['left-col__button']}
              sx={{
                padding: '0.75rem 1.5rem',
                bgcolor: 'brandAccent.main',
                '&:hover': { bgcolor: '#c14e26' },
              }}
              startIcon={<ExploreIcon />}
            >
              Start Exploring
            </Button>
            <Button
              variant="outlined"
              className={styles['left-col__button']}
              component={Link}
              href="/map"
              sx={{
                padding: '0.75rem 1.5rem',
                color: 'brandAccent.contrastText',
                border: '2px solid',
                borderColor: 'currentColor',
              }}
              startIcon={<MapIcon />}
            >
              View Map
            </Button>
          </Box>
        </Grid>

        {/* === RIGHT COLUMN === */}
        {cats && (
          <Grid size={5} className={styles['right-col']}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PlaceIcon
                fontSize="small"
                sx={{ mr: 1, color: 'brandPin.main' }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  color: 'brandAccent.contrastText',
                }}
              >
                Quick Discover
              </Typography>
            </Box>

            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {cats.map((cat) => {
                const Icon = icons[cat.id - 1 || 0];
                return (
                  <Box
                    key={cat.name}
                    component="li"
                    className={styles['quick-discover__link']}
                  >
                    <Link
                      href={`/category/${cat.slug}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '0.5rem',
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        <Icon sx={{ fontSize: 20 }} />
                        <Typography variant="body2" fontWeight="medium">
                          {cat.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {cat.companies_count} places
                      </Typography>
                    </Link>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        )}
      </Grid>
      {/* <Box width={'40%'}>
        <HeroStats />
      </Box> */}
    </Box>
  );
}
