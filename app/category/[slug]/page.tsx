import { Box, Container } from '@mui/material';
import style from './CategoryPage.module.css';
import { MOCK_BUSINESS_DETAILS } from '@/layers/03_entities/business/api/mockData';
import { CategoryFilters } from '@/layers/01_widgets/CategoryFilters/CategoryFilters';
import LongMenu from '@/layers/04_shared/ui/LongMenu';
import { CategoryList } from '@/layers/01_widgets/CategoryList/CategoryList';

export function generateMetadata() {
  return {
    title: MOCK_BUSINESS_DETAILS.name,
    description: MOCK_BUSINESS_DETAILS.description,
  };
}

export default function CategoryPage() {
  return (
    <Box component="section" sx={{ py: 3, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <div className={style['grid-container']}>
          <div className={style['grid-item__categories']}>
            <LongMenu title="Other categories" />
          </div>
          <div className={style['grid-item__filters']}>
            <CategoryFilters />
          </div>
          <div className={style['grid-item__main']}>
            <CategoryList />
          </div>
        </div>
      </Container>
    </Box>
  );
}
