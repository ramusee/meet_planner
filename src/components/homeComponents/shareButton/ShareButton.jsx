import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Button, Snackbar } from '@mui/material';
import { selectCode } from '../../../store/selectors';

const ShareButton = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const code = useSelector(selectCode);
  const handleCopy = () => {
    navigator.clipboard.writeText(`http://planing.msoft.team/${code}`);
    setOpenSnackbar(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleCopy} fullWidth>
        Share/Copy link
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Link copied!
        </Alert>
      </Snackbar>
    </>
  );
};

export { ShareButton };
