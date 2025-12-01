import { BusinessList } from '@/layers/01_widgets/BusinessList/BusinessList';
import { fetchCategoryBusinesses } from '@/layers/04_shared/utils/helpers.server';
import { redirect } from 'next/navigation';
type Props = { id: number; slug: string };

export default async function CategoryBusinessList({ id, slug }: Props) {
  const categoryBusinesses = await fetchCategoryBusinesses({
    category_id: id,
  });
  if (!categoryBusinesses) return null;
  const { data, meta } = categoryBusinesses;
  const { pagination } = meta ?? {};
  const { page, per_page, total_pages, total_count } = pagination ?? {};
  const setPage = (n: number) => {
    redirect(`/category/${slug}?page=${n}`);
  };
  return (
    // <BusinessList
    //   businessList={data}
    //   page={page}
    //   meta={meta}
    //   isError={false}
    //   isLoading={false}
    //   setPage={setPage}
    // />
    <div>CategoryBusinessList </div>
  );
}
