'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import MuiLink from '@mui/material/Link';
import { useGetCategoriesQuery } from '@/layers/03_entities/category/categoryApi';
import { useClientSetting } from '@/layers/04_shared/hooks/useClientSetting';

const CATS_NUM = 7;

export function FooterCats() {
  const [language] = useClientSetting('language', 'en');
  const {
    data: cats,
    error,
    isLoading,
  } = useGetCategoriesQuery(language, { refetchOnMountOrArgChange: false });
  const data = cats?.data.slice(0, CATS_NUM);

  if (error) return <div>error</div>;
  if (isLoading) return <div>loading</div>;
  return (
    <Grid size={3}>
      <Box>
        <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 2 }}>
          Explore
        </Typography>
        {data &&
          data.map((cat) => (
            <MuiLink
              component={Link}
              href={`/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              key={cat.id}
              underline="none"
              sx={{
                display: 'block',
                mb: 1,
                color: 'var(--color-transparent-7)',
                '&:hover': { color: 'brandAccent.main' },
              }}
            >
              <Typography variant="body2">{cat.name}</Typography>
            </MuiLink>
          ))}
      </Box>
    </Grid>
  );
}
