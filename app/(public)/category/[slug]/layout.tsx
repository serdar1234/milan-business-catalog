import { CategoryHeader } from '@/layers/01_widgets/CategoryHeader/CategoryHeader';
import { titleCase } from '@/layers/04_shared/utils/helpers';

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function CategoryLayout({
  children,
  params,
}: CategoryLayoutProps) {
  const { slug } = await params;

  const categoryName = titleCase(slug);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: categoryName, href: `/category/${slug}` },
  ];

  return (
    <>
      <CategoryHeader categoryName={categoryName} breadcrumbs={breadcrumbs} />
      {children}
    </>
  );
}
