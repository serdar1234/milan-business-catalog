import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import MuiLink from '@mui/material/Link';
import { fetchCategories } from '@/layers/04_shared/utils/helpers.server';

export async function FooterCats({ cats_num = 7 }) {
  const cats = await fetchCategories(cats_num);
  if (!cats) return null;
  return (
    <Grid size={3}>
      <Box>
        <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 2 }}>
          Explore
        </Typography>
        {cats &&
          cats.map((cat) => (
            <MuiLink
              component={Link}
              href={`/category/${cat.slug}`}
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
