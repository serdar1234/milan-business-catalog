'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { InsightCard } from '@/layers/02_features/InsightCard/ui/InsightCard';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { Insight } from '@/layers/01_widgets/LocalInsights/ui/LocalInsights';
import { ReviewFormDialog } from '@/layers/02_features/ReviewForm/ReviewFormDialog';

interface Props {
  withButton?: boolean;
  data: Insight[];
}
export const MobileView = ({ withButton = false, data }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleSubmitReview = (reviewData: unknown) => {
    console.log('Отзыв отправлен:', reviewData);
    setIsDialogOpen(false);
    // Здесь должна быть логика API (например, RTK Query мутация)
  };
  return (
    <Box
      display={{ xs: 'block', md: 'none' }}
      component="section"
      boxShadow={4}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '1rem',
        p: '1.5rem',
      }}
    >
      <WidgetHeader title="Reviews & Ratings" />
      <Box>
        {data.slice(0, 2).map((insight) => (
          <InsightCard key={insight.id} insight={insight} isDesktop={false} />
        ))}
      </Box>

      {withButton && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            component="button"
            onClick={handleOpenDialog}
            variant="text"
            color="brandAccent"
            sx={{ fontWeight: 'bold' }}
          >
            Write a Review
          </Button>
        </Box>
      )}

      <ReviewFormDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitReview}
      />
    </Box>
  );
};
