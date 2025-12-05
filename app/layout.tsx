import NextDynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { StoreProvider } from '@/layers/03_entities/providers/StoreProvider';
import { MuiThemeProvider } from '@/layers/03_entities/providers/MuiThemeProvider';
import { Header } from '@/layers/01_widgets/Header/ui/Header';
import { Playfair_Display, Inter } from 'next/font/google';
import { getSSRPreferences } from '@/layers/04_shared/utils/getSSRPreferences';
import SyncPreferences from '@/layers/04_shared/utils/SyncPreferences';
import Box from '@mui/material/Box';
import './globals.css';

const MobileNavBar = NextDynamic(
  () => import('@/layers/01_widgets/MobileNavBar/ui/MobileNavBar'),
);
const Footer = NextDynamic(
  () => import('@/layers/01_widgets/Footer/ui/Footer'),
);

const ScrollToTopButton = NextDynamic(
  () => import('@/layers/02_features/ScrollToTopButton'),
);
const MobileSearchDrawer = NextDynamic(() =>
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

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Milan Business Catalog',
  description: 'Best places to visit in Milan',
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prefs = await getSSRPreferences();

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
          <SyncPreferences
            serverLang={prefs.lang}
            serverCurrency={prefs.currency}
          />
        </body>
      </MuiThemeProvider>
    </html>
  );
}
