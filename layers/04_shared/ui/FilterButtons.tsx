'use client';

import { useState, FC } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NearMeIcon from '@mui/icons-material/NearMe';
import StarIcon from '@mui/icons-material/Star';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

interface FilterButton {
  label: string;
  value: string;
  Icon: React.ElementType;
}

const FILTER_BUTTONS: FilterButton[] = [
  { label: 'Open now', value: 'open', Icon: AccessTimeIcon },
  { label: 'Nearby', value: 'nearby', Icon: NearMeIcon },
  { label: 'Top Rated', value: 'top_rated', Icon: StarIcon },
];

export const FilterButtons: FC = () => {
  const [activeStates, setActiveStates] = useState<boolean[]>(() =>
    FILTER_BUTTONS.map(() => false),
  );

  const handleButtonClick = (index: number) => {
    setActiveStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state)),
    );
  };

  return (
    <Stack direction="row" spacing={1}>
      {FILTER_BUTTONS.map(({ label, value, Icon }, index) => (
        <Button
          key={value}
          color={activeStates[index] ? 'brandPin' : 'primary'}
          variant={activeStates[index] ? 'contained' : 'outlined'}
          onClick={() => handleButtonClick(index)}
          startIcon={<Icon sx={{ fontSize: 18 }} />}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
};
