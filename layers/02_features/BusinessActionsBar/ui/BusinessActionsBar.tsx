import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NearMeIcon from '@mui/icons-material/NearMe';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import Link from 'next/link';

interface BusinessActionsBarProps {
  phone: string;
  website: string;
  address: string;
  lat: number;
  lon: number;
  slug: string;
}

export const BusinessActionsBar: React.FC<BusinessActionsBarProps> = ({
  phone,
  website,
  lat,
  lon,
  slug,
}) => {
  const phoneHref = `tel:${phone.replace(/\s/g, '')}`;
  const directionsHref = `/map?lat=${lat}&lon=${lon}&slug=${slug}`;

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 3,
        pr: 2,
        bgcolor: 'background.paper',
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          startIcon={<NearMeIcon />}
          href={directionsHref}
        >
          Directions
        </Button>

        <Button variant="outlined" color="primary" href={phoneHref}>
          <PhoneIcon color="primary" />
        </Button>

        <Button
          variant="outlined"
          color="primary"
          href={`https://${website.replace('www.', '')}`}
          target="_blank"
        >
          <LanguageIcon color="primary" />
        </Button>
      </Box>
    </Box>
  );
};
