import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ShareButton } from '../../components/homeComponents/shareButton/ShareButton';

import { selectError, selectFullConcurrences, selectIsLoading } from '../../store/selectors';

import { Button, Container, Stack, Typography, useMediaQuery } from '@mui/material';

import { fetchMeetingConcurrences } from '../../store/actionCreators';
import { ConcurrencesList } from '../../components/concurrencesComponents/concurrencesList';

const Concurrences = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (!isLoading && !error) {
      dispatch(fetchMeetingConcurrences());
    }
  }, [isLoading, error]);
  const dispatch = useDispatch();

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
        <ConcurrencesList concurrences={fullConcurrences} type={'Full Concurrences'} />
        <ConcurrencesList concurrences={[]} type={'Part Concurrences'} />
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
