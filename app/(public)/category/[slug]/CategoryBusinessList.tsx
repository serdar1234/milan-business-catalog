'use client';

import { BusinessList } from '@/layers/01_widgets/BusinessList/BusinessList';
import { LanguageCode } from '@/layers/04_shared/configs/settings';
import { useCategoryBusinesses } from '@/layers/04_shared/hooks/useCategoryBusinesses';
import { Business, Meta } from '@/layers/04_shared/types/types';
type Props = {
  id: number;
  lang: LanguageCode;
  initialResult: {
    data: Business[];
    meta: Meta;
  };
};

export default function CategoryBusinessList({
  id,
  lang,
  initialResult,
}: Props) {
  const { page, setPage, businessList, meta, isLoading, isError } =
    useCategoryBusinesses(id, lang, initialResult);

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
