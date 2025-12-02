'use client';

import { BusinessList } from '@/layers/01_widgets/BusinessList/BusinessList';
import { useCategoryBusinesses } from '@/layers/04_shared/hooks/useCategoryBusinesses';
import { Business, Meta } from '@/layers/04_shared/types/types';
type Props = {
  id: number;
  slug: string;
  initialResult: {
    data: Business[];
    meta: Meta;
  };
};

export default function CategoryBusinessList({ id, initialResult }: Props) {
  const { page, setPage, businessList, meta, isLoading, isError } =
    useCategoryBusinesses(id, initialResult);
  return (
    <BusinessList
      businessList={businessList}
      page={page}
      meta={meta}
      isError={isError}
      isLoading={isLoading}
      setPage={setPage}
    />
  );
}
