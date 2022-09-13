import React from 'react';
import { Stack, Typography } from '@mui/material';
import { ConcurrenceItem } from './concurrenceItem/ConcurrenceItem';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../store/selectors';

const ConcurrencesList = ({ type, concurrences }) => {
  const userName = useSelector(selectUserName);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" color="text.primary">
          {type}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Timezone: <u>PDT</u>
        </Typography>
      </Stack>
      <Stack
        sx={{
          height: '250px',
          overflowY: 'auto',
          mb: '15px',
        }}
      >
        {concurrences.map((range, index) => (
          <ConcurrenceItem key={index} userName={userName} range={range} />
        ))}
      </Stack>
    </>
  );
};

export { ConcurrencesList };
