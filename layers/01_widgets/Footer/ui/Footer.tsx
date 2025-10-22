import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import EuroIcon from '@mui/icons-material/Euro';

const FOOTER_LINKS = [
  {
    title: 'Explore',
    links: [
      'Restaurants',
      'Bars & Aperitivo',
      'Cafés & Coffee',
      'Shopping',
      'Art & Culture',
      'Nightlife',
    ],
  },
  {
    title: 'Neighborhoods',
    links: [
      'Navigli',
      'Brera',
      'Quadrilatero',
      'Isola',
      'Centro Storico',
      'Porta Garibaldi',
    ],
  },
  {
    title: 'Support',
    links: [
      'Help Center',
      'Contact Us',
      'Business Owners',
      'Advertise',
      'Privacy Policy',
      'Terms of Service',
    ],
  },
];

export const Footer: React.FC = () => {
  const socialIconProps = {
    size: 'small' as const,
    sx: {
      color: 'white',
      bgcolor: 'rgba(255, 255, 255, 0.1)',
      '&:hover': { bgcolor: 'brandAccent.main' },
      mr: 1,
      p: 0.8,
    },
  };

  const NavColumn: React.FC<{ title: string; links: string[] }> = ({
    title,
    links,
  }) => (
    <Box>
      <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {links.map((link) => (
        <MuiLink
          component={Link}
          href={`/${link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
          key={link}
          underline="none"
          sx={{
            display: 'block',
            mb: 1,
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': { color: 'brandAccent.main' },
          }}
        >
          <Typography variant="body2">{link}</Typography>
        </MuiLink>
      ))}
    </Box>
  );

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'brandPrimary.main',
        color: 'white',
        py: 8,
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid size={3}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h5"
                component="h6"
                fontWeight="bold"
                sx={{ color: 'brandAccent.main', mr: 1 }}
              >
                M
              </Typography>
              <Typography variant="h5" component="h6" fontWeight="bold">
                MilanoDiscover
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Your ultimate guide to discovering the best of Milan, from
              canal-side aperitivo bars to world-class restaurants and hidden
              gems.
            </Typography>

            <Box sx={{ display: 'flex' }}>
              <IconButton {...socialIconProps}>
                {' '}
                <InstagramIcon />{' '}
              </IconButton>
              <IconButton {...socialIconProps}>
                {' '}
                <FacebookIcon />{' '}
              </IconButton>
              <IconButton {...socialIconProps}>
                {' '}
                <TwitterIcon />{' '}
              </IconButton>
              <IconButton {...socialIconProps}>
                {' '}
                <YouTubeIcon />{' '}
              </IconButton>
            </Box>
          </Grid>

          {FOOTER_LINKS.map((col) => (
            <Grid size={3} key={col.title}>
              <NavColumn {...col} />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 6,
            pt: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            © 2025 MilanoDiscover. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              <LanguageIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption">English</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              <EuroIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption">EUR</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
