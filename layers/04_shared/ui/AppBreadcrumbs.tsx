import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NextLink from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AppBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const AppBreadcrumbs: React.FC<AppBreadcrumbsProps> = ({ items }) => {
  return (
    <Box
      sx={{
        py: 2,
        bgcolor: 'background.paper',
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ maxWidth: 'lg', mx: 'auto', px: 2, fontSize: '0.875rem' }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast) {
            return (
              <Typography
                key={index}
                color="text.primary"
                fontWeight="bold"
                fontSize={'0.875rem'}
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={index}
              component={NextLink}
              href={item.href || '#'}
              underline="hover"
              color="text.secondary"
              sx={{ fontWeight: 'normal' }}
            >
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};
