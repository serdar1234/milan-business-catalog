'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterSection from '@/layers/04_shared/ui/FilterSection';
import {
  Box,
  Typography,
  Slider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Checkbox,
  Button,
} from '@mui/material';
import {
  MAX_RADIUS,
  PRICE_OPTIONS,
  ATMOSPHERE_OPTIONS,
  FEATURE_OPTIONS,
} from '@/layers/04_shared/api/mocks/filterMocks';
import {
  FilterState,
  INITIAL_FILTER_STATE,
} from '@/layers/04_shared/api/types/filterTypes';
import { RootState } from '@/layers/04_shared/lib/store';
import {
  resetCategoryState,
  setFilters,
} from '@/layers/03_entities/category/model/categoryStateSlice';

export default function Filters({
  setOpen,
}: {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  const initialFilters: FilterState = useSelector(
    (state: RootState) => state.categoryState.filters,
  );

  const [currentFilters, setCurrentFilters] =
    useState<FilterState>(initialFilters);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    setCurrentFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRadiusChange = (event: Event, newValue: number | number[]) => {
    updateFilter('radius', newValue as number);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = event.target.value;
    const finalPrice = newPrice === currentFilters.priceRange ? null : newPrice;
    updateFilter('priceRange', finalPrice);
  };

  const handleCheckboxChange = (
    key: 'atmosphere' | 'features',
    value: string,
  ) => {
    const list = currentFilters[key] as string[];
    const newList = list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];

    updateFilter(key, newList);
  };

  const handleApply = () => {
    dispatch(setFilters(currentFilters));
    if (setOpen) setOpen(false);
  };

  const handleCancel = () => {
    setCurrentFilters(initialFilters);
    if (setOpen) setOpen(false);
  };
  const { radius, priceRange, atmosphere, features } = currentFilters;

  function handleReset() {
    dispatch(resetCategoryState());
    setCurrentFilters(INITIAL_FILTER_STATE);
  }

  return (
    <>
      {/* Radius */}
      <FilterSection title="Distance">
        <Box sx={{ p: 1 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            sx={{ fontFamily: (theme) => theme.typography.fontFamily }}
          >
            {radius} km
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Shows businesses within this distance from your location
          </Typography>
          <Slider
            value={radius}
            onChange={handleRadiusChange}
            min={1}
            max={MAX_RADIUS}
            step={1}
            sx={{
              color: 'brandPin.main',
              '& .MuiSlider-thumb': {
                width: 18,
                height: 18,
                border: '3px solid currentColor',
                bgcolor: 'white',
                '&:focus, &:hover, &.Mui-active': {
                  boxShadow: '0 0 0 5px rgba(255, 69, 0, 0.1)',
                },
              },
            }}
          />
        </Box>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <FormControl component="fieldset">
          <RadioGroup
            value={priceRange}
            onChange={handlePriceChange}
            row
            sx={{ gap: 1, flexWrap: 'nowrap' }}
          >
            {PRICE_OPTIONS.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    size="small"
                    checked={priceRange === option.value}
                    sx={{ display: 'none' }}
                  />
                }
                label={
                  <Box
                    sx={{
                      py: '0.25rem',
                      bgcolor:
                        priceRange === option.value
                          ? 'brandAccent.main'
                          : 'background.paper',
                      color:
                        priceRange === option.value
                          ? 'white'
                          : 'brandAccent.main',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      minWidth: 50,
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      border: '1px solid',
                      borderColor:
                        priceRange === option.value
                          ? 'brandAccent.main'
                          : '#E0E0E0',
                      '&:hover': {
                        borderColor: 'brandAccent.light',
                      },
                    }}
                  >
                    {option.label}
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </FilterSection>

      {/*  Atmosphere */}
      <FilterSection title="Atmosphere">
        <Stack direction="column" spacing={0}>
          {ATMOSPHERE_OPTIONS.map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  size="small"
                  checked={atmosphere.includes(label)}
                  onChange={() => handleCheckboxChange('atmosphere', label)}
                />
              }
              label={<Typography variant="body2">{label}</Typography>}
            />
          ))}
        </Stack>
      </FilterSection>

      {/* Features */}
      <FilterSection title="Features">
        <Stack direction="column" spacing={0}>
          {FEATURE_OPTIONS.map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  size="small"
                  checked={features.includes(label)}
                  onChange={() => handleCheckboxChange('features', label)}
                />
              }
              label={<Typography variant="body2">{label}</Typography>}
            />
          ))}
        </Stack>
      </FilterSection>

      {/* Filters buttons */}
      <Box
        sx={{
          p: { xs: 0, md: 2 },
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <Button color="primary" variant="outlined" onClick={handleReset}>
          Reset
        </Button>
        <Button color="primary" variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="brandPin" variant="contained" onClick={handleApply}>
          Apply filters
        </Button>
      </Box>
    </>
  );
}
