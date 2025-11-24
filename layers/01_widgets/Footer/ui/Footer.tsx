import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { NavColumn } from '@/layers/04_shared/ui/NavColumn';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FooterLogo } from './FooterLogo';
import { FooterCats } from './FooterCats';
import { LanguageCurrencySwitcher } from '@/layers/01_widgets/LanguageCurrencySwitcher/';

const FOOTER_LINKS = [
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

const Footer: React.FC = () => {
  const socialIconProps = {
    size: 'small' as const,
    sx: {
      color: 'white',
      bgcolor: 'var(--color-transparent-1)',
      '&:hover': { bgcolor: 'brandAccent.main' },
      mr: 1,
      p: 0.8,
    },
  };

  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      color="primary.contrastText"
      sx={{
        py: 8,
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid size={3}>
            <FooterLogo />

            <Typography
              variant="body2"
              sx={{ mb: 3, color: 'var(--color-transparent-7)' }}
            >
              Your ultimate guide to discovering the best of Milan, from
              canal-side aperitivo bars to world-class restaurants and hidden
              gems.
            </Typography>

            <Box sx={{ display: 'flex' }}>
              <IconButton {...socialIconProps}>
                <InstagramIcon />
              </IconButton>
              <IconButton {...socialIconProps}>
                <FacebookIcon />
              </IconButton>
              <IconButton {...socialIconProps}>
                <TwitterIcon />
              </IconButton>
              <IconButton {...socialIconProps}>
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>

          <FooterCats />

          {FOOTER_LINKS.map((col) => (
            <Grid size={3} key={col.title}>
              <NavColumn {...col} />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid var(--color-transparent-1)',
            mt: 6,
            pt: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: '' }}>
            © 2025 MilanoDiscover. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <LanguageCurrencySwitcher light />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
