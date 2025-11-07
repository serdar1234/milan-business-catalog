'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Stack,
  Slider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MAX_RADIUS = 50;
const PRICE_OPTIONS = [
  { value: '1', label: '€' },
  { value: '2', label: '€€' },
  { value: '3', label: '€€€' },
  { value: '4', label: '€€€€' },
];

const ATMOSPHERE_OPTIONS = ['Cozy', 'Lively', 'Romantic', 'Quiet'];

const FEATURE_OPTIONS = [
  'Canal View',
  'Happy Hour',
  'Outdoor Seating',
  'Live Music',
  'Private Dining',
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  children,
  defaultExpanded = true,
}) => (
  <Accordion defaultExpanded={defaultExpanded} disableGutters elevation={0}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon color="action" />}
      sx={{ minHeight: 48, p: 0 }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ p: 2 }}>{children}</AccordionDetails>
  </Accordion>
);

export const CategoryFilters: React.FC = () => {
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [atmosphere, setAtmosphere] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [radius, setRadius] = useState<number>(25);

  const handleRadiusChange = (event: Event, newValue: number | number[]) => {
    setRadius(newValue as number);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = event.target.value;
    setPriceRange(newPrice === priceRange ? null : newPrice);
  };

  const handleCheckboxChange = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const filters = (
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

      {/* (Price Range) */}
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
                    sx={{ display: 'none' }} // Скрываем стандартный радио-кружок
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
                        priceRange === option.value ? 'white' : 'text.primary',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      minWidth: 50,
                      textAlign: 'center',
                      transition: 'all 0.2s',
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

      {/* (Atmosphere) */}
      <FilterSection title="Atmosphere">
        <Stack direction="column" spacing={0}>
          {ATMOSPHERE_OPTIONS.map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  size="small"
                  checked={atmosphere.includes(label)}
                  onChange={() =>
                    handleCheckboxChange(atmosphere, setAtmosphere, label)
                  }
                />
              }
              label={<Typography variant="body2">{label}</Typography>}
            />
          ))}
        </Stack>
      </FilterSection>

      {/* (Features) */}
      <FilterSection title="Features">
        <Stack direction="column" spacing={0}>
          {FEATURE_OPTIONS.map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  size="small"
                  checked={features.includes(label)}
                  onChange={() =>
                    handleCheckboxChange(features, setFeatures, label)
                  }
                />
              }
              label={<Typography variant="body2">{label}</Typography>}
            />
          ))}
        </Stack>
      </FilterSection>
    </>
  );

  return (
    <>
      <Box
        display={{ xs: 'flex', md: 'none' }}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '1rem',
          boxShadow: 2,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Filters are not available on mobile yet
        </Typography>
      </Box>

      <Box
        display={{ xs: 'none', md: 'flex' }}
        sx={{
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: '1rem',
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Filters
        </Typography>

        {filters}
      </Box>
    </>
  );
};
