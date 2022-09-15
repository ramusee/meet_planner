import React, { memo } from 'react';

import { Avatar, Stack, Typography } from '@mui/material';
import googleIcon from '../../../images/googleIcon.png';
import { DateObject } from 'react-multi-date-picker';

const ConcurrenceItem = memo(({ userName, range }) => {
  const dateFormat = 'MM/DD/YYYY';
  const timeFormat = 'HH:mm a';

  const concurrence = {
    date: new DateObject(new Date(range[0])).format(dateFormat),
    timeStart: new DateObject(new Date(range[0])).format(timeFormat),
    timeEnd: new DateObject(new Date(range[1])).format(timeFormat),
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      mt="10px"
      p="5px"
      sx={{
        border: '1px solid grey',
        borderRadius: '10px',
      }}
    >
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Stack>
          <Typography
            component="span"
            color="text.secondary"
            variant="body2"
            sx={{ textDecoration: 'underline' }}
          >
            {concurrence.date}
          </Typography>
          <Typography component="span" color="text.secondary" variant="body2" fontWeight="500">
            {concurrence.timeStart} — {concurrence.timeEnd}
          </Typography>
          <Typography color="text.primary" variant="body2">
            {userName || 'name'}
          </Typography>
        </Stack>
        <Typography color="text.primary"></Typography>
        <Stack alignItems="center">
          <Avatar
            alt="google-calendar icon"
            variant="rounded"
            sx={{
              width: '35px',
              height: '35px',
            }}
            src={googleIcon}
          />
          <Typography variant="body2" color="text.primary" fontWeight="400">
            Schedule
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
});

export { ConcurrenceItem };
