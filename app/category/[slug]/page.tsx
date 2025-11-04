import { Box, Container } from '@mui/material';
import style from './CategoryPage.module.css';
import { MOCK_BUSINESS_DETAILS } from '@/layers/03_entities/business/api/mockData';

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
            <Box>
              <h2>Category Select</h2>
            </Box>
          </div>
          <div className={style['grid-item__filters']}>
            <Box
              sx={{
                width: '100%',
                height: { md: '100%' },
              }}
            >
              <h2>Filters</h2>
            </Box>
          </div>
          <div className={style['grid-item__main']}>
            <Box>
              <h2>Category Name</h2>
              <h2>Category Page</h2>
              <h2>Category Name</h2>
              <h2>Category Page</h2>
              <h2>Category Name</h2>
              <h2>Category Page</h2>
              <h2>Category Name</h2>
              <h2>Category Page</h2>
            </Box>
          </div>
        </div>
      </Container>
    </Box>
  );
}
