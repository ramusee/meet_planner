import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { selectFullConcurrences, selectIsLoadingFetchConcurrences } from '../../store/selectors';
import { setMeetingCode } from '../../store/slices/mainSlice';

import { Button, Container, Stack, Typography, useMediaQuery } from '@mui/material';

import { fetchMeetingConcurrences } from '../../store/actionCreators';
import { ConcurrencesList } from '../../components/concurrencesComponents/concurrencesList';
import { getMeetingCode, saveMeetingCode } from '../../helpers/localStorage';
import { setFalseSuccess } from '../../store/slices/concurrencesSlice';
import { ShareButton } from '../../components/homeComponents/shareButton/ShareButton';

const Concurrences = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const meetingCode = params.meetingCode;
  const isValidCode = getMeetingCode() === meetingCode;
  const isLoadingFetch = useSelector(selectIsLoadingFetchConcurrences);

  if (!isValidCode) {
    dispatch(setMeetingCode(meetingCode));
    saveMeetingCode(meetingCode);
  }

  useEffect(() => {
    dispatch(fetchMeetingConcurrences());
    dispatch(setFalseSuccess());
  }, []);

  const matches = useMediaQuery('(min-width: 990px)');
  const fullConcurrences = useSelector(selectFullConcurrences);

  return (
    <>
      <Container maxWidth="xs">
        <Typography
          textAlign="center"
          variant={matches ? 'h4' : 'body2'}
          fontWeight={matches ? '500' : '400'}
          color="text.primary"
          gutterBottom
        >
          Concurrences
        </Typography>
        {!!fullConcurrences.length && (
          <ConcurrencesList concurrences={fullConcurrences} type={'Full Concurrences'} />
        )}
        {!fullConcurrences.length && !isLoadingFetch && (
          <Typography variant="h5" textAlign="center" color="text.primary" mt="100px">
            No concurrences
          </Typography>
        )}
        {!isLoadingFetch && !!fullConcurrences.length && (
          <ConcurrencesList concurrences={[]} type={'Part Concurrences'} />
        )}
      </Container>
      <Stack margin="0 auto" maxWidth="400px" spacing={2} width="100%">
        <Button variant="contained" color="success" component={Link} to="/date">
          Fill up your slots
        </Button>
        <ShareButton />
      </Stack>
    </>
  );
};

export { Concurrences };
