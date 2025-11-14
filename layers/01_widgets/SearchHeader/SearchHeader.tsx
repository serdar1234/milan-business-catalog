'use client';
import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import {
  SearchHeaderMobile,
  SearchHeaderDesktop,
} from '@/layers/02_features/SearchHeaderVersions';

type ViewType = 'list' | 'map' | 'grid';

interface SearchHeaderProps {
  totalResults: number;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onFilterClick: () => void;
  pageTitle: string;
}

export const SearchHeader: React.FC<SearchHeaderProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return <SearchHeaderMobile {...props} />;
  }

  return <SearchHeaderDesktop {...props} />;
};
