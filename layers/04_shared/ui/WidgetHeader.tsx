import { Typography } from '@mui/material';

interface WidgetHeaderProps {
  title: string;
  subtitle?: string;
}

export const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        fontWeight="bold"
        sx={{
          mb: { xs: 2, md: 0.5 },
          textAlign: { xs: 'start', md: 'center' },
        }}
      >
        {title}
      </Typography>

      <Typography
        display={{ xs: 'none', md: 'block' }}
        variant="subtitle1"
        component="p"
        sx={{ mb: 3, textAlign: 'center' }}
      >
        {subtitle}
      </Typography>
    </>
  );
};
