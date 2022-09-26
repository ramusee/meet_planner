import React from 'react';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { ConcurrenceItem } from './concurrenceItem/ConcurrenceItem';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../store/selectors';

const ConcurrencesList = ({ type, concurrences }) => {
  const matches = useMediaQuery('(max-width: 320px)');
  const userName = useSelector(selectUserName);
  const isFullConc = type === 'Full Concurrences';

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" color="text.primary">
          {type}
        </Typography>
        {isFullConc && (
          <Typography variant="body2" color="text.primary">
            Timezone: <u>PDT</u>
          </Typography>
        )}
      </Stack>
      <Stack
        sx={{
          height: !matches ? '200px' : '150px',
          justifyContent: 'space-between',
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
