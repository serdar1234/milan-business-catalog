import { CategoryHeader } from '@/layers/01_widgets/CategoryHeader/CategoryHeader';
import { titleCase } from '@/layers/04_shared/utils/helpers';

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const MOCK_MAIN_CATEGORY = {
  slug: 'food-and-drink',
  name: 'Food & Drink',
};

export default async function CategoryLayout({
  children,
  params,
}: CategoryLayoutProps) {
  const { slug } = await params;

  const subcategoryName = titleCase(slug);

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
