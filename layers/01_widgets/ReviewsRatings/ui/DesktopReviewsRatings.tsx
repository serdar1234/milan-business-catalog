'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { InsightCard } from '@/layers/02_features/InsightCard/ui/InsightCard';
import { INSIGHT_MOCKS } from '@/layers/04_shared/api/mocks/localInsightsMocks';
import { withRatingHeader } from '@/layers/04_shared/hocs/withRatingHeader';
// import { MOCK_STATS } from '@/layers/04_shared/api/mocks/reviewStatsMocks';
// import { RatingPanel } from '@/layers/02_features/RatingPanel/RatingPanel';
import { useState } from 'react';
import { ReviewStats } from '../../BusinessPageWrapper/BusinessPageWrapper';

interface Props {
  stats: ReviewStats;
}

const RatedWidgetHeader = withRatingHeader(WidgetHeader);
const INITIAL_REVIEWS_COUNT = 3;

export const DesktopReviewsRatings: React.FC<Props> = ({ stats }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const allInsights = INSIGHT_MOCKS;
  const initialInsights = allInsights.slice(0, INITIAL_REVIEWS_COUNT);
  const collapsibleInsights = allInsights.slice(INITIAL_REVIEWS_COUNT);
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
        buttonText="Write a Review"
        stats={stats}
        {...{ marginBottom: 0 }}
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
