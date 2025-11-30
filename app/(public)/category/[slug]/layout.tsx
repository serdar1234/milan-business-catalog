import { CategoryHeader } from '@/layers/01_widgets/CategoryHeader/CategoryHeader';
import { BASE_URL } from '@/layers/03_entities/api/baseApi';
import { notFound } from 'next/navigation';

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function CategoryLayout({
  children,
  params,
}: CategoryLayoutProps) {
  const { slug } = await params;
  const categoryData = await fetch(`${BASE_URL}/categories/${slug}`);
  if (!categoryData.ok) {
    notFound();
  }
  const json = await categoryData.json();
  const { name: categoryName, companies_count } = json.data;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: categoryName, href: `/category/${slug}` },
  ];

  return (
    <>
      <CategoryHeader
        categoryName={categoryName}
        placeCount={companies_count}
        breadcrumbs={breadcrumbs}
      />
      {children}
    </>
  );
}
