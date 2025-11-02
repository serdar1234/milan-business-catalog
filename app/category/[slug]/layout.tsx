import { CategoryHeader } from '@/layers/01_widgets/CategoryHeader/CategoryHeader';

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

const MOCK_MAIN_CATEGORY = {
  slug: 'food-and-drink',
  name: 'Food & Drink',
};

export default async function CategoryLayout({
  children,
  params,
}: CategoryLayoutProps) {
  // Преобразование slug в читаемое имя (это заглушка, в реальности будет запрос к API)
  const param = await params;
  const subcategorySlug = param.slug;
  const subcategoryName = subcategorySlug
    .replace(/-/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    // Главная Категория (Food & Drink)
    {
      label: MOCK_MAIN_CATEGORY.name,
      href: `/category/${MOCK_MAIN_CATEGORY.slug}`,
    },
    // Подкатегория (Restaurants)
    { label: subcategoryName, href: `/category/${subcategorySlug}` },
  ];

  // const handleFilterChange = (filter: string) => {
  //     console.log(`Filter applied in CategoryLayout: ${filter}`);
  //     // Здесь будет логика применения фильтра к странице.
  // };

  return (
    <>
      <CategoryHeader
        categoryName={subcategoryName}
        breadcrumbs={breadcrumbs}
        // onFilterChange={handleFilterChange}
      />
      {children}
    </>
  );
}
