import { useClientSetting } from './useClientSetting';
import { useGetCategoriesQuery } from '@/layers/03_entities/category/categoryApi';

interface NavigationLink {
  href: string;
  label: string;
}

export const useNavigationLinks = (count: number = 3): NavigationLink[] => {
  const [language] = useClientSetting('language', 'en');
  const { data: options } = useGetCategoriesQuery(language, {
    refetchOnMountOrArgChange: false,
  });

  const navLinks =
    options?.slice(0, count).map((option) => ({
      href: `/category/${option.slug}`,
      label: option.name,
    })) ?? [];

  navLinks.push({ href: '/map', label: 'Map View' });

  return navLinks;
};
