import { IconButton } from '@mui/material';
import styles from './ui.module.css';

interface ArrowButtonProps {
  fn: () => void;
  total: number;
  direction: 'left' | 'right';
  children: React.ReactNode;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  fn,
  total,
  direction,
  children,
}) => (
  <IconButton
    onClick={(e) => {
      e.stopPropagation();
      fn();
    }}
    disabled={total <= 1}
    sx={{
      [direction]: { xs: 8, md: 24 },
    }}
    className={styles['arrow-btn']}
  >
    {children}
  </IconButton>
);
