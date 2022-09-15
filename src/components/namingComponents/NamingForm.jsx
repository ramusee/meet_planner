import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Alert, Box, Button, Snackbar, TextField, useMediaQuery } from '@mui/material';
import { setUserName } from '../../store/slices/mainSlice';
import { selectCode, selectDates } from '../../store/selectors';
import { postTimeRanges } from '../../store/actionCreators';

import { upperLetter } from '../../helpers/upperLetter';
import { getTimeRanges } from '../../helpers/getTimeRanges';

const NamingForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [isEmptyRanges, setIsEmptyRanges] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dates = useSelector(selectDates);
  const meetingCode = useSelector(selectCode);
  const matches = useMediaQuery('(min-width: 990px)');

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }
    setIsEmptyRanges(false);
  };

  const onSubmit = e => {
    e.preventDefault();
    const ranges = getTimeRanges(dates);

    if (!inputValue || !ranges.length) {
      setIsEmptyRanges(true);
      return;
    }

    dispatch(setUserName(upperLetter(inputValue)));
    dispatch(postTimeRanges({ userName: upperLetter(inputValue), userRanges: getTimeRanges(dates) }));

    navigate(`/${meetingCode}`);

    setInputValue('');
  };
  const onChangeInputValue = e => {
    setInputValue(e.target.value);
  };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        flexDirection: matches ? 'row' : 'column',
        alignItems: matches ? 'end' : 'center',
        gap: '20px',
      }}
    >
      <TextField
        label="Your Name"
        variant="outlined"
        color="success"
        value={inputValue}
        onChange={onChangeInputValue}
      />
      <Button type="submit" variant="contained" color="success">
        Save
      </Button>
      <Snackbar open={isEmptyRanges} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Fill up your slots
        </Alert>
      </Snackbar>
    </Box>
  );
};

export { NamingForm };
