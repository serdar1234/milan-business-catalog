import { Box, Container } from '@mui/material';
import style from './CategoryPage.module.css';
import { CategoryFilters } from '@/layers/01_widgets/CategoryFilters/CategoryFilters';
import LongMenu from '@/layers/04_shared/ui/LongMenu';
// import { BusinessList } from '@/layers/01_widgets/BusinessList/BusinessList';
import type { Metadata } from 'next';
import { BASE_URL } from '@/layers/03_entities/api/baseApi';
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const category = await fetch(`${BASE_URL}/categories/${slug}`);
  const json = await category.json();
  const { name } = json.data;

  return {
    title: name + ' category',
    description: `${name} businesses in Milano`,
  };
}
export default function CategoryPage() {
  return (
    <Box component="section" sx={{ py: 3, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <div className={style['grid-container']}>
          <div className={style['grid-item__categories']}>
            <LongMenu title="Categories" />
          </div>
          <div className={style['grid-item__filters']}>
            <CategoryFilters />
          </div>
          <div className={style['grid-item__main']}>
            {/* <BusinessList /> */}
          </div>
        </div>
      </Container>
    </Box>
  );
}
