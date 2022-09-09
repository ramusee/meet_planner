import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCode } from '../../../store/selectors';

import { Alert, Button, Snackbar } from '@mui/material';

const shareLink = async shareData => {
  try {
    await navigator.share(shareData);
  } catch (err) {
    return 'Error: link is not valid';
  }
};

const ShareButton = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');

  const code = useSelector(selectCode);
  const link = `https://planing.msoft.team/${code}`;

  const shareData = {
    url: link,
    title: 'Meet Planner',
    text: 'Join the meeting!',
  };

  const handleShare = () => {
    if (navigator.share) {
      shareLink(shareData).then(err => {
        if (err) {
          setError(err);
          setOpenSnackbar(true);
        }
      });
    } else {
      setError('Sorry! Your browser does not support Web Share API.');
      setOpenSnackbar(true);
    }
  };
  const handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleShare} fullWidth>
        Share/Copy link
      </Button>
      {error && (
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export { ShareButton };
