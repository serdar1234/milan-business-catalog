import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  size?: number;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  bgcolor?: string;
  height?: string;
}

export function Spinner({ size, color, bgcolor, height }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height ?? 'auto',
        backgroundColor: bgcolor ?? 'var(--color-secondary-main)',
      }}
    >
      <CircularProgress size={size ?? 60} color={color ?? 'primary'} />
    </div>
  );
}
