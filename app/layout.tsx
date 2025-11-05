import { lazy } from 'react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import './globals.css';
import { StoreProvider } from '@/layers/04_shared/providers/StoreProvider';
import { MuiThemeProvider } from '@/layers/04_shared/providers/MuiThemeProvider';
import { Header } from '@/layers/01_widgets/Header/ui/Header';
import { Playfair_Display, Inter } from 'next/font/google';
const Footer = lazy(() => import('@/layers/01_widgets/Footer/ui/Footer'));
const MobileNavBar = lazy(
  () => import('@/layers/01_widgets/MobileNavBar/ui/MobileNavBar'),
);

import { Box } from '@mui/material';
import ScrollToTopButton from '@/layers/02_features/ScrollToTopButton';
import { DeviceLayoutWrapper } from '@/layers/04_shared/hocs/DeviceLayoutWrapper';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hd = await headers();
  const ua = hd.get('user-agent') || '';
  const isMobile = /Mobi|Android/i.test(ua);

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <MuiThemeProvider>
        <body className={inter.className}>
          <StoreProvider>
            <AppRouterCacheProvider options={{ key: 'css' }}>
              <Header />
              <Box component="main" sx={{ pb: { xs: 8, md: 0 } }}>
                {children}
                <ScrollToTopButton />
              </Box>
              <DeviceLayoutWrapper
                mobile={<MobileNavBar />}
                desktop={<Footer />}
                initialIsMobile={isMobile}
              />
            </AppRouterCacheProvider>
          </StoreProvider>
        </body>
      </MuiThemeProvider>
    </html>
  );
}
