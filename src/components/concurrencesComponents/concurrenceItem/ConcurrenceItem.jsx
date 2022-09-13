import React, { memo } from 'react';

import { Avatar, Stack, Typography } from '@mui/material';
import googleIcon from '../../../images/googleIcon.png';

const ConcurrenceItem = memo(({ userName, range }) => {
  const concurrence = {
    start: new Date(range[0]),
    end: new Date(range[1]),
  };
  const concurrence1 = {
    start: range[0],
    end: range[1],
  };
  console.log(concurrence);
  console.log(concurrence1);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      mt="10px"
      p="10px"
      sx={{
        border: '1px solid grey',
        borderRadius: '10px',
      }}
    >
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Typography color="text.primary">{userName || 'name'}</Typography>
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
