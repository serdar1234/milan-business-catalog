import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

type IconName = 'User' | 'Menu' | 'Close' | 'Search';

export const Icon: React.FC<{ iconName: IconName; className?: string }> = ({
  iconName,
  className,
}) => {
  let IconComponent;
  switch (iconName) {
    case 'User':
      IconComponent = AccountCircleIcon;
      break;
    case 'Menu':
      IconComponent = MenuIcon;
      break;
    case 'Close':
      IconComponent = CloseIcon;
      break;
    case 'Search':
      IconComponent = SearchIcon;
      break;
    default:
      return null;
  }

  return <IconComponent className={className} />;
};
