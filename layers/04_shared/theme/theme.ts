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
    },
    secondary: {
      main: '#FFB46B', // Soft Sunset Orange
    },
    error: {
      main: '#E94F37', // Vibrant Orange for error messages
    },
    brandPrimary: {
      main: '#0B3A5B',
    },
    brandAccent: {
      main: '#D3542A', // Warm Terracotta (for CTA)
      dark: '#C14E26',
      contrastText: '#FFFFFF',
    },
    brandPin: {
      main: '#E94F37', // Vibrant Orange (for Map pin / rating star)
    },
    statusError: {
      main: '#A31F2E', // dark red (Closing Soon)
      contrastText: '#FFFFFF',
    },
    statusFeatured: {
      main: '#114B3C', // dark green (Featured)
      contrastText: '#FFFFFF',
    },
    surface: {
      main: '#E5E7EB', // Surface (Card)
    },
    background: {
      default: '#FFF9F3', // Pale Cream (Background)
      paper: '#FFFFFF', // Surface (Card)
    },

    text: {
      primary: '#102428', // Dark Teal
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
      fontFamily: inter.style.fontFamily,
      fontWeight: 700,
    },
    h6: {
      fontFamily: playfair.style.fontFamily,
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
