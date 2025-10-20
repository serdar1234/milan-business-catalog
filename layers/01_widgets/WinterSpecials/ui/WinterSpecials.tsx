'use client';

import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import {
  SpecialCard,
  SpecialCardProps,
} from '@/layers/02_features/SpecialCard/ui/SpecialCard';
import Link from 'next/link';
import WineBarOutlinedIcon from '@mui/icons-material/WineBarOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';

const TOP_EVENTS: SpecialCardProps[] = [
  {
    title: 'Christmas Markets',
    subtitle:
      "Experience the magic of Milano's Christmas markets with mulled wine, local crafts, and holiday treats throughout the city center.",
    link: '#',
    bgColor: 'var(--color-dark-red)' as const,
    isLarge: true,
    chipLabel: 'Limited Time',
    date: 'Dec 1 - Jan 6',
    location: 'Various locations',
    buttonText: 'Explore',
  },
  {
    title: 'La Scala Season',
    subtitle:
      'Immerse yourself in world-class opera and ballet performances at the legendary Teatro alla Scala during the winter season.',
    link: '#',
    bgColor: 'var(--color-status-featured)' as const,
    isLarge: true,
    chipLabel: 'Winter Special',
    date: 'Dec 7 - Mar 15',
    location: 'Teatro alla Scala',
    buttonText: 'Book Now',
  },
];

const MINOR_EVENTS: SpecialCardProps[] = [
  {
    title: 'Winter Aperitivo',
    subtitle:
      'Warm up with special winter cocktails and heated terraces at selected bars.',
    link: '#',
    bgColor: 'var(--color-background)' as const,
    icon: WineBarOutlinedIcon,
    date: 'Available at 45+ venues',
  },
  {
    title: 'Truffle Season',
    subtitle: "Indulge in fresh truffle menus at Milano's finest restaurants.",
    link: '#',
    bgColor: 'var(--color-background)' as const,
    icon: RestaurantOutlinedIcon,
    date: 'Nov - Feb special menus',
  },
  {
    title: 'Shopping Specials',
    subtitle: 'Exclusive winter sales and experiences in the fashion capital.',
    link: '#',
    bgColor: 'var(--color-background)' as const,
    icon: CardGiftcardOutlinedIcon,
    date: 'Dec - Jan promotions',
  },
];

export const WinterSpecials: React.FC = () => {
  const MobileView = (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(to right, #114B3C, #0B3A5B)',
        p: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        color="surface"
        component="div"
      >
        Winter Special Offers
      </Typography>

      <Typography
        variant="body1"
        color="rgba(255, 255, 255, 0.7)"
        sx={{ mb: 3 }}
      >
        Warm up with exclusive deals from local businesses
      </Typography>

      <Button
        component={Link}
        href="/offers"
        variant="contained"
        color="surface"
        sx={{
          maxWidth: 120,
          height: 36,
          color: 'brandPrimary.main',
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
      >
        View Offers
      </Button>
    </Box>
  );

  const DesktopView = (
    <Box sx={{ position: 'relative' }}>
      <Grid container spacing={3} sx={{ mb: 3, position: 'relative' }}>
        {TOP_EVENTS.map((event) => (
          <Grid size={6} key={event.title} component={'article'}>
            <SpecialCard {...event} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {MINOR_EVENTS.map((event) => (
          <Grid size={4} key={event.title}>
            <SpecialCard {...event} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Box
      component="section"
      sx={{ py: 6, backgroundColor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <WidgetHeader
            title="Winter Events & Specials"
            subtitle="Don't miss these seasonal experiences in Milano"
          />
        </Box>

        <Box sx={{ display: { xs: 'block', md: 'none' } }}>{MobileView}</Box>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>{DesktopView}</Box>
      </Container>
    </Box>
  );
};
