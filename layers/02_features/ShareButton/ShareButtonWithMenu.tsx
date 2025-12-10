'use client';

import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/X';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface ShareButtonWithMenuProps {
  companyName: string;
}

export const ShareButtonWithMenu: React.FC<ShareButtonWithMenuProps> = ({
  companyName,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>(
    'success',
  );

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (text: string, severity: 'success' | 'error') => {
    setAlertText(text);
    setAlertSeverity(severity);
    setSnackbarOpen(true);
  };
  const open = Boolean(anchorEl);

  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out ${companyName} on Milan Business Catalog!`;

  const shareOnPlatform = (urlTemplate: string) => {
    handleClose();
    showSnackbar('Opening share window...', 'success');
    window.open(urlTemplate, '_blank', 'width=600,height=400');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl,
    )}`;
    shareOnPlatform(facebookUrl);
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}&url=${encodeURIComponent(currentUrl)}`;
    shareOnPlatform(twitterUrl);
  };

  const copyLink = () => {
    handleClose();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      showSnackbar('Link copied to clipboard!', 'success');
    } else {
      showSnackbar('Clipboard access denied.', 'error');
    }
  };

  return (
    <>
      <IconButton
        onClick={handleShareClick}
        aria-controls={open ? 'share-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          color: 'brandAccent.main',
          bgcolor: 'rgba(255, 255, 255, 0.5)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.7)',
          },
        }}
        aria-label="share"
      >
        <ShareIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              mt: 1.5,
              minWidth: 'fit-content',
              backdropFilter: 'blur(3px)',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={shareOnFacebook}>
          <ListItemIcon>
            <FacebookIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="body2">Facebook</Typography>
        </MenuItem>

        <MenuItem onClick={shareOnTwitter}>
          <ListItemIcon>
            <TwitterIcon fontSize="small" sx={{ color: '#1DA1F2' }} />
          </ListItemIcon>
          <Typography variant="body2">X (Twitter)</Typography>
        </MenuItem>

        <MenuItem onClick={copyLink}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Copy Link</Typography>
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </>
  );
};
