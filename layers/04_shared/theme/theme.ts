import { createTheme } from '@mui/material/styles';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  weight: ['700'], // Используем жирное начертание для заголовков
  subsets: ['latin'],
  display: 'swap', // Позволяет браузеру сначала отобразить запасной шрифт
});

const inter = Inter({
  weight: ['300', '400', '500', '700'], // Включаем нужные толщины
  subsets: ['latin'],
  display: 'swap',
});

declare module '@mui/material/styles' {
  interface Palette {
    brandPrimary: Palette['primary'];
    brandAccent: Palette['primary'];
    brandPin: Palette['primary'];
    surface: Palette['primary'];
  }
  interface PaletteOptions {
    brandPrimary?: PaletteOptions['primary'];
    brandAccent?: PaletteOptions['primary'];
    brandPin?: PaletteOptions['primary'];
    surface?: PaletteOptions['primary'];
  }
}

export const customTheme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#0B3A5B', // Deep Canal Blue (часто используется для AppBar/Buttons)
    },
    secondary: {
      main: '#FFB46B', // Soft Sunset Orange
    },
    error: {
      main: '#E94F37', // Vibrant Orange для ошибок или критических акцентов
    },

    brandPrimary: {
      main: '#0B3A5B',
    },
    brandAccent: {
      main: '#D3542A', // Warm Terracotta (Для CTA)
    },
    brandPin: {
      main: '#E94F37', // Vibrant Orange (Для Map pin / rating star)
    },
    surface: {
      main: '#FFFFFF', // Card and Surface
    },

    // Цвет фона страницы (используется MUI)
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
    h6: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h1: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#D3542A', // Использование Terracotta для Primary Button
          '&:hover': {
            backgroundColor: '#c14e26', // Чуть темнее при наведении
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
