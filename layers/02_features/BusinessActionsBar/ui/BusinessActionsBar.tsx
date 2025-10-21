import { Box, Button, Typography } from '@mui/material';

import EventNoteIcon from '@mui/icons-material/EventNote';
import NearMeIcon from '@mui/icons-material/NearMe';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface BusinessActionsBarProps {
  phone: string;
  website: string;
  address: string;
  views: number;
  saves: number;
}

export const BusinessActionsBar: React.FC<BusinessActionsBarProps> = ({
  phone,
  website,
  address,
  views,
  saves,
}) => {
  const phoneHref = `tel:${phone.replace(/\s/g, '')}`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 3,
        bgcolor: 'background.paper',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="brandAccent"
          startIcon={<EventNoteIcon />}
        >
          Reserve Table
        </Button>

        <Button
          variant="contained"
          color="brandPrimary"
          startIcon={<NearMeIcon />}
          href={directionsHref}
          target="_blank"
        >
          Get Directions
        </Button>

        {/* 3. Call Now (Светлый контур) */}
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<PhoneIcon />}
          href={phoneHref}
          sx={{ borderColor: 'grey.300', color: 'text.primary' }}
        >
          Call Now
        </Button>

        {/* 4. Website (Светлый контур) */}
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<LanguageIcon />}
          href={`https://${website.replace('www.', '')}`}
          target="_blank"
          sx={{ borderColor: 'grey.300', color: 'text.primary' }}
        >
          Website
        </Button>
      </Box>

      {/* Правая часть: Статистика */}
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}
      >
        {/* Просмотры */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <VisibilityIcon
            sx={{ color: 'statusError.main', fontSize: 20, mr: 0.5 }}
          />
          <Typography variant="body2" color="text.secondary" fontWeight="bold">
            {views.toLocaleString()} views this week
          </Typography>
        </Box>

        {/* Сохранения */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BookmarkIcon
            sx={{ color: 'brandAccent.main', fontSize: 20, mr: 0.5 }}
          />
          <Typography variant="body2" color="text.secondary" fontWeight="bold">
            Saved {saves} times
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
