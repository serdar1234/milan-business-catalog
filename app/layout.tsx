import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import './globals.css';
import { StoreProvider } from '@/layers/04_shared/providers/StoreProvider';
import { MuiThemeProvider } from '@/layers/04_shared/providers/MuiThemeProvider';
import { Header } from '@/layers/01_widgets/Header/ui/Header';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Milan Business Catalog',
  description: 'Best places to visit in Milan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <MuiThemeProvider>
        <body className={inter.className}>
          <StoreProvider>
            <AppRouterCacheProvider options={{ key: 'css' }}>
              <Header />
              {children}
            </AppRouterCacheProvider>
          </StoreProvider>
        </body>
      </MuiThemeProvider>
    </html>
  );
}
