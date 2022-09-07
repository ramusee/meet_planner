import React from 'react';
import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from '../../store/slices/mainSlice';
import { NamingForm } from '../../components/namingComponents/NamingForm';
import { selectUserName } from '../../store/selectors';

const Naming = () => {
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width: 990px)');

  const handleNextBtn = () => {
    navigate('/concurrences');
  };

  return (
    <>
      <Typography
        textAlign="center"
        variant={matches ? 'h5' : 'body2'}
        fontWeight={matches ? '500' : '400'}
        color="text.primary"
      >
        Underwrite your slots
      </Typography>
      {!userName ? (
        <NamingForm />
      ) : (
        <Stack alignItems="center" gap="20px">
          <Typography textAlign="center" variant="body1">
            {userName}, do you want to change your name?
          </Typography>
          <Button variant="outlined" color="success" onClick={() => dispatch(setUserName(''))}>
            change
          </Button>
        </Stack>
      )}
      <Stack direction="row" justifyContent="space-between">
        <Button component={Link} to="/timing" variant="contained" color="success">
          back
        </Button>
        {userName && (
          <Button variant="contained" color="success" onClick={handleNextBtn}>
            next
          </Button>
        )}
      </Stack>
    </>
  );
};

export { Naming };
