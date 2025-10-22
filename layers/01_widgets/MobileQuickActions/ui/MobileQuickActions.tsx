import { Box, Typography, Grid, ButtonBase } from '@mui/material';

import PhoneIcon from '@mui/icons-material/Phone';
import NearMeIcon from '@mui/icons-material/NearMe';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';

const ACTION_COLORS = {
  CALL: 'brandAccent.main',
  DIRECTIONS: 'brandPrimary.main',
  RESERVE: 'statusFeatured.main',
  SAVE: 'statusError.main',
};

interface MobileQuickActionsProps {
  phone: string;
  address: string;
  isFavorite: boolean;
}

export const MobileQuickActions: React.FC<MobileQuickActionsProps> = ({
  phone,
  address,
  isFavorite,
}) => {
  const actions = [
    {
      label: 'Call Now',
      icon: PhoneIcon,
      color: ACTION_COLORS.CALL,
      href: `tel:${phone.replace(/\s/g, '')}`,
    },
    {
      label: 'Directions',
      icon: NearMeIcon,
      color: ACTION_COLORS.DIRECTIONS,
      href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
    },
    {
      label: 'Reserve',
      icon: EventNoteIcon,
      color: ACTION_COLORS.RESERVE,
      onClick: () => console.log('Open Reserve Modal'),
    },
    {
      label: 'Save',
      icon: FavoriteIcon,
      color: ACTION_COLORS.SAVE,
      iconColor: isFavorite ? 'white' : 'white',
    },
  ];

  const ActionTile: React.FC<(typeof actions)[0]> = ({
    label,
    icon: Icon,
    color,
    href,
  }) => (
    <Grid size={6}>
      <ButtonBase
        component={href ? 'a' : 'button'}
        href={href}
        target={href ? '_blank' : undefined}
        sx={{
          width: '100%',
          p: 2,
          bgcolor: color,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          height: 100,
          boxShadow: 2,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Icon sx={{ fontSize: 32, mb: 0.5 }} />
        <Typography variant="body2" fontWeight="bold">
          {label}
        </Typography>
      </ButtonBase>
    </Grid>
  );

  return (
    <Box
      component="section"
      sx={{
        p: 3,
        display: { xs: 'block', md: 'none' },
      }}
    >
      <WidgetHeader title="Quick Actions" subtitle="Get to know your place" />
      <Grid container spacing={1.5}>
        {actions.map((action, index) => (
          <ActionTile key={index} {...action} />
        ))}
      </Grid>
    </Box>
  );
};
