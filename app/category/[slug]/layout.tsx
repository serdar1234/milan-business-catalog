'use client';

import { CategoryHeader } from '@/layers/01_widgets/CategoryHeader/CategoryHeader';
import { useParams } from 'next/navigation';

interface CategoryLayoutProps {
  children: React.ReactNode;
}

const MOCK_MAIN_CATEGORY = {
  slug: 'food-and-drink',
  name: 'Food & Drink',
};

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  const { slug } = useParams<{ slug: string }>();

  const subcategoryName =
    (slug &&
      slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())) ||
    '';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    {
      label: MOCK_MAIN_CATEGORY.name,
      href: `/category/${MOCK_MAIN_CATEGORY.slug}`,
    },
    { label: subcategoryName, href: `/category/${slug}` },
  ];

  return (
    <>
      <CategoryHeader
        categoryName={subcategoryName}
        breadcrumbs={breadcrumbs}
      />
      {children}
    </>
  );
}
