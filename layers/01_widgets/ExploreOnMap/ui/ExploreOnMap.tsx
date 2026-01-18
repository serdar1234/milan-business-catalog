import { Box } from '@mui/material';
import { DesktopView } from './DesktopView';
import { MobileView } from './MobileView';

type ExploreOnMapType = () => Promise<React.ReactElement>;

export const ExploreOnMap: ExploreOnMapType = async () => {
  const [mobileView] = await Promise.all([MobileView()]);

  return (
    <Box component="section" sx={{ py: 6 }}>
      {mobileView}
      <DesktopView />
    </Box>
  );
};
