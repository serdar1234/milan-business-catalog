import { Business } from '@/layers/04_shared/types/types';
import { fetchBusinessesWithCategory } from '@/layers/04_shared/utils/helpers.server';
import { DesktopViewClient } from './DesktopViewClient';
import { DEFAULT_FILTER } from './config';
import { DesktopViewServerProps } from './types';

export const DesktopView: React.FC<DesktopViewServerProps> = async ({
  initialFilter = DEFAULT_FILTER,
}) => {
  let businesses: Business[] = [];

  try {
    const result = await fetchBusinessesWithCategory({
      limit: 50,
      sort: 'rating',
      category_id: undefined,
    });

    businesses = result?.data || [];
  } catch (error) {
    console.error('Error fetching businesses for DesktopView:', error);
    businesses = [];
  }

  const uniqueCategories = [...new Set(businesses.map((b) => b.category.name))];
  const firstTwoCategories = uniqueCategories.slice(0, 3);
  const availableFilters = [
    { label: 'All', categoryId: undefined },
    ...firstTwoCategories.map((catName) => {
      const categoryObj = businesses.find(
        (b) => b.category.name === catName,
      )?.category;
      return {
        label: catName,
        categoryId: categoryObj?.id,
      };
    }),
  ];

  return (
    <DesktopViewClient
      initialBusinesses={businesses}
      initialFilter={initialFilter}
      availableFilters={availableFilters}
    />
  );
};
