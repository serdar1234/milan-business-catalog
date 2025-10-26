import { Grid, Button } from '@mui/material';

interface ActionButtonProps {
  label: string;
  Icon: React.ElementType;
  colorKey: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  Icon,
  colorKey,
}) => (
  <Grid size={4}>
    <Button
      variant="contained"
      fullWidth
      onClick={() => console.log(`Clicked ${label}`)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.8,
        padding: '0.8rem',
        alignItems: 'center',
        textTransform: 'capitalize',
        bgcolor: `${colorKey}.main`,
        '&:hover': {
          bgcolor: `${colorKey}.dark`,
        },
      }}
    >
      <Icon />
      {label}
    </Button>
  </Grid>
);
