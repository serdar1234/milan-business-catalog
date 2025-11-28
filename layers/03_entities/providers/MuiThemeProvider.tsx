'use client';

import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from '@/layers/04_shared/theme/theme';

export const MuiThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
};
