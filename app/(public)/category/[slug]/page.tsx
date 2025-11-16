import { Box, Container } from '@mui/material';
import style from './CategoryPage.module.css';
import { CategoryFilters } from '@/layers/01_widgets/CategoryFilters/CategoryFilters';
import LongMenu from '@/layers/04_shared/ui/LongMenu';
import { CategoryBusinessList } from '@/layers/01_widgets/CategoryBusinessList/CategoryBusinessList';
import type { Metadata } from 'next';
import { getTitleFromSlug } from '@/layers/04_shared/utils/helpers';
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const titleCase = getTitleFromSlug(slug);

  return {
    title: titleCase + ' category',
    description: `${titleCase} businesses in Milano`,
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
            <CategoryBusinessList />
          </div>
        </div>
      </Container>
    </Box>
  );
}
