import { BrowseByCategory } from '@/layers/01_widgets/BrowseByCategory/BrowseByCategory';
import { HeroSearch } from '@/layers/01_widgets/HeroSearch/ui/HeroSearch';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box component="main">
      {' '}
      {/* Используем Box из MUI для основного контента */}
      {/* 1. Наш новый виджет Hero с поиском */}
      <HeroSearch />
      <BrowseByCategory />
      {/* ... (Секция категорий и избранного остаются) ... */}
    </Box>
  );
}
