'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Rating,
  Checkbox,
  FormControlLabel as MuiFormControlLabel,
} from '@mui/material';
import {
  DISTANCE_OPTIONS,
  PRICE_OPTIONS_VERBOSE,
  RATING_OPTIONS,
  FEATURES_OPTIONS_VERBOSE,
  ATMOSPHERE_OPTIONS_COUNT,
} from '@/layers/04_shared/api/mocks/filterMocks';

const FilterHeader = ({ title }: { title: string }) => (
  <>
    <Divider sx={{ mb: 2 }} />
    <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1, mb: 1 }}>
      {title}
    </Typography>
  </>
);

export const SearchFilters: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentDistance = searchParams.get('distance') || '1km';
  const currentPrice = searchParams.get('price') || '';
  const currentRating = searchParams.get('rating') || '';

  const currentFeatures = searchParams.get('features')?.split(',') || [];
  const currentAtmosphere = searchParams.get('atmosphere')?.split(',') || [];

  const updateSearchParams = (key: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
      const combinedValue = value.filter((v) => v).join(',');
      if (combinedValue) {
        params.set(key, combinedValue);
      } else {
        params.delete(key);
      }
    } else if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleRadioChange = (key: string, value: string) => {
    const newValue = searchParams.get(key) === value ? '' : value;
    updateSearchParams(key, newValue);
  };

  const handleCheckboxChange = (
    key: string,
    value: string,
    isChecked: boolean,
  ) => {
    let currentValues =
      searchParams
        .get(key)
        ?.split(',')
        .filter((v) => v) || [];

    if (isChecked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      currentValues = currentValues.filter((v) => v !== value);
    }

    updateSearchParams(key, currentValues);
  };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    searchParams.forEach((_, key) => {
      if (key !== 'q' && key !== 'view') {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Box
      sx={{
        p: 2,
        pb: '2rem',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          Filters
        </Typography>
        <Button onClick={handleClearAll} size="small" color="brandPin">
          Clear all
        </Button>
      </Box>

      <FilterHeader title="Distance" />
      <RadioGroup
        value={currentDistance}
        onChange={(e) => handleRadioChange('distance', e.target.value)}
      >
        {DISTANCE_OPTIONS.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            sx={{ width: 'fit-content' }}
            control={<Radio size="small" />}
            label={<Typography variant="body2">{option.label}</Typography>}
          />
        ))}
      </RadioGroup>

      <FilterHeader title="Price" />
      <RadioGroup
        value={currentPrice}
        onChange={(e) => handleRadioChange('price', e.target.value)}
      >
        {PRICE_OPTIONS_VERBOSE.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            sx={{ width: 'fit-content' }}
            control={<Radio size="small" />}
            label={<Typography variant="body2">{option.label}</Typography>}
          />
        ))}
      </RadioGroup>

      <FilterHeader title="Rating" />
      {RATING_OPTIONS.map((option) => (
        <MuiFormControlLabel
          key={'rating_' + option.value}
          control={
            <Checkbox
              size="small"
              checked={currentRating.includes(option.value)}
              onChange={(e) =>
                handleCheckboxChange('rating', option.value, e.target.checked)
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

      <FilterHeader title="Features" />
      {FEATURES_OPTIONS_VERBOSE.map((feature) => (
        <div key={'features_' + feature.value} style={{ display: 'block' }}>
          <MuiFormControlLabel
            control={
              <Checkbox
                size="small"
                checked={currentFeatures.includes(feature.value)}
                onChange={(e) =>
                  handleCheckboxChange(
                    'features',
                    feature.value,
                    e.target.checked,
                  )
                }
              />
            }
            label={<Typography variant="body2">{feature.label}</Typography>}
          />
        </div>
      ))}

      <FilterHeader title="Atmosphere" />
      {ATMOSPHERE_OPTIONS_COUNT.map((atmosphere) => (
        <div
          key={'atmosphere_' + atmosphere.value}
          style={{ display: 'block' }}
        >
          <MuiFormControlLabel
            control={
              <Checkbox
                size="small"
                checked={currentAtmosphere.includes(atmosphere.value)}
                onChange={(e) =>
                  handleCheckboxChange(
                    'atmosphere',
                    atmosphere.value,
                    e.target.checked,
                  )
                }
              />
            }
            label={<Typography variant="body2">{atmosphere.label}</Typography>}
          />
        </div>
      ))}
    </Box>
  );
};
