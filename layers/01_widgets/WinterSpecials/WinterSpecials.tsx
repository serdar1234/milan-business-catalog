import { Box, Container } from '@mui/material';
import { DesktopView, MobileView } from '@/layers/04_shared/ui/WinterSpecials';

export const WinterSpecials: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{ py: 6, backgroundColor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        <MobileView /> <DesktopView />
      </Container>
    </Box>
  );
};
