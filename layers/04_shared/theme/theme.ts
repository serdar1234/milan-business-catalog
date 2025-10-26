import { createTheme } from '@mui/material/styles';
import { Playfair_Display, Inter } from 'next/font/google';

// =========================================================
// 1. Pallete options
// =========================================================
declare module '@mui/material/styles' {
  interface Palette {
    brandPrimary: Palette['primary'];
    brandAccent: Palette['primary'];
    brandPin: Palette['primary'];
    surface: Palette['primary'];
    statusError: Palette['primary'];
    statusFeatured: Palette['primary'];
  }
  interface PaletteOptions {
    brandPrimary?: PaletteOptions['primary'];
    brandAccent?: PaletteOptions['primary'];
    brandPin?: PaletteOptions['primary'];
    surface?: PaletteOptions['primary'];
    statusError?: PaletteOptions['primary'];
    statusFeatured?: PaletteOptions['primary'];
  }
}

// =========================================================
// 2. Button color props
// =========================================================
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    brandPrimary: true;
    brandAccent: true;
    brandPin: true;
    surface: true;
    statusError: true;
    statusFeatured: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    brandPrimary: true;
    brandAccent: true;
    brandPin: true;
    surface: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    brandPrimary: true;
    brandAccent: true;
    statusError: true;
    statusFeatured: true;
  }
}

// =========================================================
// 3. Typography
// =========================================================
const playfair = Playfair_Display({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const customTheme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#0B3A5B', // Deep Canal Blue (for AppBar/Buttons)
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFB46B', // Warm Sand (for AppBar/Buttons)
      light: '#FFC790',
      dark: '#E09F5A',
      contrastText: '#000000',
    },
    error: {
      main: '#E94F37', // Vibrant Orange for error messages
      light: '#EB6E5C',
      dark: '#C83B25',
      contrastText: '#FFFFFF',
    },

    brandPrimary: {
      main: '#0B3A5B',
      contrastText: '#FFFFFF',
      light: '#3C6986', // Lighten 20%
      dark: '#082E47', // Darken 20%
    },
    brandAccent: {
      main: '#D3542A', // Warm Terracotta (for CTA)
      dark: '#C14E26',
      contrastText: '#FFFFFF',
      light: '#DD7855',
    },
    brandPin: {
      main: '#E94F37', // Vibrant Orange (for Map pin / rating star)
      light: '#EB6E5C', // Lighten 10%
      dark: '#C83B25', // Darken 10%
      contrastText: '#FFFFFF',
    },

    statusError: {
      main: '#A31F2E', // dark red (Closing Soon)
      dark: '#7A1824',
      light: '#F4D3D6',
      contrastText: '#FFE0E2',
    },
    statusFeatured: {
      main: '#114B3C', // dark green (Featured)
      contrastText: '#FFFFFF',
      light: '#3D7A6A', // Lighten 20%
      dark: '#0C372B', // Darken 20%
    },

    success: {
      main: '#16A34A',
      dark: '#15803D',
      contrastText: '#BBF7D0',
      light: '#F0FDF4',
    },

    surface: {
      main: '#E5E7EB', // Surface (Card)
      light: '#F0F2F5',
      dark: '#C3C5C9',
      contrastText: '#102428',
    },
    background: {
      default: '#FFF9F3', // Pale Cream (Background)
      paper: '#FFFFFF', // Surface (Card)
    },

    text: {
      primary: '#102428', // Dark Teal
      secondary: '#4A5C61', // medium Teal
      disabled: '#A9B5B8', // light Teal
    },
  },

  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h2: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h3: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h4: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h5: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h6: {
      fontFamily: inter.style.fontFamily,
      fontWeight: 700,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#D3542A',
          '&:hover': {
            backgroundColor: '#c14e26',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0B3A5B',
        },
      },
    },
  },
});
