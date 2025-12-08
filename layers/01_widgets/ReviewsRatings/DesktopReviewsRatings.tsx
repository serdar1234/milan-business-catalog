'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { InsightCard } from '@/layers/02_features/InsightCard/ui/InsightCard';
import { ReviewStats } from '@/layers/01_widgets/BusinessPageWrapper/BusinessPageWrapper';
import { Insight } from '@/layers/01_widgets/LocalInsights/ui/LocalInsights';
import { RatedWidgetHeader } from './RatedWidgetHeader';

interface Props {
  stats: ReviewStats;
  slug: string;
  reviews: Insight[];
}

const INITIAL_REVIEWS_COUNT = 3;

export const DesktopReviewsRatings: React.FC<Props> = ({
  stats,
  slug,
  reviews,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialInsights = reviews.slice(0, INITIAL_REVIEWS_COUNT);
  const collapsibleInsights = reviews.slice(INITIAL_REVIEWS_COUNT);
  const canCollapse = collapsibleInsights.length > 0;

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const buttonText = isExpanded ? 'Show Less Reviews' : `Load More Reviews`;
  return (
    <Box
      display={{ xs: 'none', md: 'block' }}
      component="section"
      boxShadow={4}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '1rem',
        p: '2rem',
      }}
    >
      <RatedWidgetHeader
        title="Reviews & Ratings"
        stats={stats}
        slug={slug}
        buttonText="Write a Review"
      />

      <Grid container spacing={4}>
        {/* <RatingPanel {...stats} /> */}
        <Grid size={12}>
          {initialInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
          {canCollapse && (
            <Collapse in={isExpanded} timeout={500} unmountOnExit>
              {collapsibleInsights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </Collapse>
          )}
        </Grid>
      </Grid>
      {canCollapse && (
        <Box display="flex" justifyContent="center">
          <Button
            onClick={handleToggleExpand}
            variant="text"
            endIcon={
              <ExpandMoreIcon
                sx={{
                  transition: 'transform 300ms ease-in-out',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            }
            sx={{
              color: 'brandAccent.main',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            {buttonText}
          </Button>
        </Box>
      )}
    </Box>
  );
};
