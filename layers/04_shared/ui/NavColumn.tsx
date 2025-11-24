import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import MuiLink from '@mui/material/Link';

export const NavColumn: React.FC<{ title: string; links: string[] }> = ({
  title,
  links,
}) => (
  <Box>
    <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 2 }}>
      {title}
    </Typography>
    {links.map((link) => (
      <MuiLink
        component={Link}
        href={`/${link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
        key={link}
        underline="none"
        sx={{
          display: 'block',
          mb: 1,
          color: 'var(--color-transparent-7)',
          '&:hover': { color: 'brandAccent.main' },
        }}
      >
        <Typography variant="body2">{link}</Typography>
      </MuiLink>
    ))}
  </Box>
);
