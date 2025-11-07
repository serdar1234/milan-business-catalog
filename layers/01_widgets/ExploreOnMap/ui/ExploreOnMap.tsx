import { Box } from '@mui/material';
import { DesktopView } from './DesktopView';
import { MobileView } from './MobileView';

export const ExploreOnMap: React.FC = () => {
  return (
    <Box component="section" sx={{ py: 6 }}>
      <MobileView /> <DesktopView />
    </Box>
  );
};
