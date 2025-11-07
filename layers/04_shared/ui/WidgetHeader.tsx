import { Typography } from '@mui/material';

interface WidgetHeaderProps {
  title: string;
  subtitle?: string;
  marginBottom?: number | string;
}

export const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  subtitle,
  marginBottom = '1rem',
}) => {
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        fontWeight="bold"
        sx={{
          mb: { marginBottom },
          textAlign: { xs: 'start', md: 'center' },
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          display={{ xs: 'none', md: 'block' }}
          variant="subtitle1"
          component="p"
          sx={{ mb: 3, textAlign: 'center' }}
        >
          {subtitle}
        </Typography>
      )}
    </>
  );
};
