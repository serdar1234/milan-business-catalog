import { Box, Typography, Link as MuiLink } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  icon: SvgIconComponent;
  count: number;
  href: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  icon: Icon,
  count,
  href,
}) => {
  return (
    <MuiLink
      component={Link}
      href={href}
      underline="none"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.default',
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },

        maxWidth: 140,
        flexGrow: 1,
        p: 1.5,
        boxShadow: { xs: 0, md: 1 },
      }}
    >
      {/* Контейнер для иконки */}
      <Box
        sx={{
          // Десктопные стили: иконка в круге
          display: 'flex',
          width: 64,
          height: 64,
          borderRadius: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 1,
          bgcolor: { xd: 'transparent', md: 'rgba(211, 84, 42, 0.1)' },
        }}
      >
        <Icon
          sx={{
            color: 'brandAccent.main',
            fontSize: 32,
          }}
        />
      </Box>

      <Typography
        variant="caption"
        fontWeight="medium"
        textAlign="center"
        color="text.primary"
        sx={{ mt: { xs: 0.5, md: 0 } }}
      >
        {name}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{
          mt: 0.5,
          fontSize: 12,
          display: { xs: 'none', md: 'block' },
        }}
      >
        {count} places
      </Typography>
    </MuiLink>
  );
};
