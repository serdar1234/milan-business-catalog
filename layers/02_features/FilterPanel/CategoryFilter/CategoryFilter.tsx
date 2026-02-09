'use client';

import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import { FilterGroup } from '../FilterGroup';
import { Facets } from '@/layers/04_shared/types/types';
import { useFetchCategories } from '@/layers/04_shared/hooks/useFetchCategories';

interface CategoryFilterProps {
  meta?: {
    pagination: {
      page: number;
      per_page: number;
      total_pages: number;
      total_count: number;
    };
    source: string;
    facets?: Facets;
  } | null;
  onCheckboxChange: (key: string, value: string, isChecked: boolean) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  meta,
  onCheckboxChange,
}) => {
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get('category_id') || '';
  const { categories } = useFetchCategories();
  const catsMap = new Map(categories?.map((c) => [c.id, c.name]) || []);

  if (!meta?.facets?.category_id || meta.facets.category_id.length === 0) {
    return null;
  }

  return (
    <FilterGroup title="Categories">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {meta.facets.category_id.map((category) => {
          const isChecked = currentCategoryId.split(',').includes(category.key);
          return (
            <MuiFormControlLabel
              key={'category_' + category.key}
              control={
                <Checkbox
                  size="small"
                  checked={isChecked}
                  onChange={(e) =>
                    onCheckboxChange(
                      'category_id',
                      category.key,
                      e.target.checked,
                    )
                  }
                />
              }
              label={
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Typography variant="body2">
                    {catsMap.get(parseInt(category.key))} ({category.count})
                  </Typography>
                </Box>
              }
            />
          );
        })}
      </Box>
    </FilterGroup>
  );
};
