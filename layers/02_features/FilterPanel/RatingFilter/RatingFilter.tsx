'use client';

import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import { FilterGroup } from '../FilterGroup';
import { RATING_OPTIONS } from '@/layers/04_shared/api/mocks/filterMocks';

interface RatingFilterProps {
  onCheckboxChange: (key: string, value: string, isChecked: boolean) => void;
}

export const RatingFilter: React.FC<RatingFilterProps> = ({
  onCheckboxChange,
}) => {
  const searchParams = useSearchParams();
  const currentRating = searchParams.get('rating') || '';

  return (
    <FilterGroup title="Rating">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {RATING_OPTIONS.map((option) => (
          <MuiFormControlLabel
            key={'rating_' + option.value}
            control={
              <Checkbox
                size="small"
                checked={currentRating.includes(option.value)}
                onChange={(e) =>
                  onCheckboxChange('rating', option.value, e.target.checked)
                }
              />
            }
            label={
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Typography variant="body2">{option.label}</Typography>
                <Rating
                  name={`rating-${option.value}`}
                  defaultValue={parseFloat(option.value)}
                  precision={0.5}
                  readOnly
                  sx={{
                    color: 'ratingGold.main',
                    fontSize: '1.25rem',
                    ml: 1,
                  }}
                />
              </Box>
            }
          />
        ))}
      </Box>
    </FilterGroup>
  );
};
