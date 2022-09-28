import React, { useEffect } from 'react';
import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from '../../store/slices/mainSlice';
import { NamingForm } from '../../components/namingComponents/NamingForm';
import {
  selectCode,
  selectDates,
  selectIsLoadingPostRanges,
  selectPostSuccess,
  selectUserName,
} from '../../store/selectors';
import { postTimeRanges } from '../../store/actionCreators';
import { upperLetter } from '../../helpers/upperLetter';
import { getTimeRanges } from '../../helpers/getTimeRanges';

const Naming = () => {
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width: 990px)');
  const dates = useSelector(selectDates);
  const meetingCode = useSelector(selectCode);
  const postSuccess = useSelector(selectPostSuccess);
  const isLoadingPost = useSelector(selectIsLoadingPostRanges);

  const handleNextBtn = () => {
    const ranges = getTimeRanges(dates);
    dispatch(postTimeRanges({ userName: upperLetter(userName), userRanges: ranges }));
  };
  useEffect(() => {
    if (!postSuccess) {
      return;
    }
    navigate(`/${meetingCode}`);
  }, [postSuccess]);
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
      {!userName && <NamingForm />}
      {userName && !isLoadingPost && !postSuccess && (
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
