import Button from '@mui/material/Button';
import style from './ui.module.css';

export default function RoundIconButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      component="a"
      href={href}
      rel="noopener noreferrer"
      className={style.roundIconButton}
      aria-label="Call business"
    >
      {children}
    </Button>
  );
}
