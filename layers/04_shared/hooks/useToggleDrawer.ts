import { useState, useCallback } from 'react';

export const useToggleDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.MouseEvent | React.KeyboardEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpen(open);
    },
    [],
  );

  return { open, toggleDrawer, setOpen };
};
