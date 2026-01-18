import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { CategoryFilters } from '@/layers/01_widgets/CategoryFilters/CategoryFilters';
import { LongMenu } from '@/layers/04_shared/ui/LongMenu';
import style from './CategoryPage.module.css';
import { CategoryBusinessList } from './CategoryBusinessList';

import type { Metadata } from 'next';
import {
  fetchCategories,
  fetchCategory,
} from '@/layers/04_shared/utils/helpers.server';
import { notFound } from 'next/navigation';
import { CategoryHeader } from '@/layers/01_widgets/CategoryHeader/CategoryHeader';

interface Props {
  params: { slug: string } | Promise<{ slug: string }>;
  searchParams: { page?: string } | Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const json = await fetchCategory(slug);

  if (!json) return { title: 'Category', description: '' };

  const { name, companies_count } = json.data;

  return {
    title: `${name} category`,
    description: `${companies_count} ${name.toLowerCase()} businesses in Milano`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const categories = await fetchCategories();
  const json = await fetchCategory(slug);

  if (!json) notFound();
  const { name, companies_count, id } = json.data;

  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: name, href: `/category/${slug}` },
  ];

  return (
    <>
      <CategoryHeader
        categoryName={name}
        placeCount={companies_count}
        breadcrumbs={breadcrumbs}
      />
      <Box component="section" sx={{ py: 3, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <div className={style['grid-container']}>
            <div className={style['grid-item__categories']}>
              <LongMenu title="Categories" categories={categories} />
            </div>
            <div className={style['grid-item__filters']}>
              <CategoryFilters />
            </div>
            <div className={style['grid-item__main']}>
              <CategoryBusinessList id={id} currentPage={currentPage} />
            </div>
          </div>
        </Container>
      </Box>
    </>
  );
}
