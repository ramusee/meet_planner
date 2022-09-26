import React, { useEffect } from 'react';
import { Box, CircularProgress, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useDispatch, useSelector } from 'react-redux';
import { selectCode, selectError, selectIsLoading } from '../../../store/selectors';
import { fetchMeetingCode } from '../../../store/actionCreators';

const LinkBar = () => {
  const code = useSelector(selectCode);
  const matches = useMediaQuery('(max-width: 320px)');

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const link = `${window.location.href}${code}`;

  useEffect(() => {
    if (!code) {
      dispatch(fetchMeetingCode());
    }
  }, []);

  const replaceCode = () => {
    dispatch(fetchMeetingCode());
  };

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 0 0 15px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        width: '95%',
        maxWidth: matches ? '290px' : '390px',
      }}
    >
      {error && (
        <Typography mr="10px" variant="body1" color="primary" component="span" textAlign="center">
          {error}
        </Typography>
      )}
      {!error && (
        <Typography
          component="span"
          color="primary"
          sx={{
            fontSize: matches ? '12px' : '14px',
            // padding: '5px',
          }}
        >
          {link}
        </Typography>
      )}
      <Box sx={{ display: 'flex', width: '20px' }}>{isLoading && <CircularProgress size={20} />}</Box>
      <IconButton color="primary" aria-label="replace link" onClick={replaceCode}>
        <ChangeCircleIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
};

export { LinkBar };
