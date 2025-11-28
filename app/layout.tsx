import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { StoreProvider } from '@/layers/03_entities/providers/StoreProvider';
import { MuiThemeProvider } from '@/layers/03_entities/providers/MuiThemeProvider';
import { Header } from '@/layers/01_widgets/Header/ui/Header';
import { Playfair_Display, Inter } from 'next/font/google';
import Box from '@mui/material/Box';
import './globals.css';
const MobileNavBar = dynamic(
  () => import('@/layers/01_widgets/MobileNavBar/ui/MobileNavBar'),
);
const Footer = dynamic(() => import('@/layers/01_widgets/Footer/ui/Footer'));

const ScrollToTopButton = dynamic(
  () => import('@/layers/02_features/ScrollToTopButton'),
);
const MobileSearchDrawer = dynamic(() =>
  import('@/layers/01_widgets/MobileSearchDrawer/MobileSearchDrawer').then(
    (mod) => mod.MobileSearchDrawer,
  ),
);

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
              <MobileSearchDrawer />
              <MobileNavBar />
              <Footer />
            </AppRouterCacheProvider>
          </StoreProvider>
        </body>
      </MuiThemeProvider>
    </html>
  );
}
