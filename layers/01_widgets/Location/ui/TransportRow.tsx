import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { Box, Typography } from '@mui/material';
import DriveEtaIcon from '@mui/icons-material/DriveEta';

// Component for transport row
export const TransportRow: React.FC<{
  icon: 'walk' | 'bus' | 'car';
  label: string;
}> = ({ icon, label }) => {
  let IconComponent;
  if (icon === 'walk') IconComponent = DirectionsWalkIcon;
  else if (icon === 'bus') IconComponent = DirectionsBusIcon;
  else IconComponent = DriveEtaIcon;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <IconComponent
        sx={{ color: 'brandAccent.main', mr: 1.5, fontSize: 24 }}
      />
      <Typography variant="body1" color="text.primary">
        {label}
      </Typography>
    </Box>
  );
};
