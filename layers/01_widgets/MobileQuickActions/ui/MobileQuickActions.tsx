import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import PhoneIcon from '@mui/icons-material/Phone';
import NearMeIcon from '@mui/icons-material/NearMe';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { ACTION_COLORS } from '@/layers/04_shared/utils/constants';
import Link from 'next/link';

interface MobileQuickActionsProps {
  phone: string;
  coordinates: { lat: number; lon: number };
  isFavorite?: boolean;
}

export const MobileQuickActions: React.FC<MobileQuickActionsProps> = ({
  phone,
  coordinates,
  // isFavorite,
}) => {
  const { lat, lon } = coordinates;
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
      href: `/map?lat=${lat}&lon=${lon}`,
    },
    // {
    //   label: 'Reserve',
    //   icon: EventNoteIcon,
    //   color: ACTION_COLORS.RESERVE,
    //   onClick: () => console.log('Open Reserve Modal'),
    // },
    // {
    //   label: 'Save',
    //   icon: FavoriteIcon,
    //   color: ACTION_COLORS.SAVE,
    //   iconColor: isFavorite ? 'white' : 'white',
    // },
  ];

  const ActionTile: React.FC<(typeof actions)[0]> = ({
    label,
    icon: Icon,
    color,
    href,
  }) => (
    <Grid size={6}>
      <ButtonBase
        component={href ? Link : 'button'}
        href={href}
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
