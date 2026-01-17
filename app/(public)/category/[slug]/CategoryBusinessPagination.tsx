'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@mui/material/Pagination';

interface CategoryBusinessPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function CategoryBusinessPagination({
  currentPage,
  totalPages,
}: CategoryBusinessPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 1) {
      // Remove page param if it's page 1 (default)
      params.delete('page');
    } else {
      params.set('page', value.toString());
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
    />
  );
}
