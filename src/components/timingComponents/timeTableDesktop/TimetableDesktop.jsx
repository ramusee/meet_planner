import React from 'react';
import { Box, Typography } from '@mui/material';
import { TimetableList } from '../timeTable/timeTableList/TimetableList';
import s from '../../../pages/timing/timing.module.css';
import { DateObject } from 'react-multi-date-picker';

const hours = [
  '12 AM',
  '1 AM',
  '2 AM',
  '3 AM',
  '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  'Noon',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
  '10 PM',
  '11 PM',
];

const TimetableDesktop = ({ date }) => {
  return (
    <Box sx={{ minWidth: '200px' }}>
      <Typography className={s.date}>{new DateObject(date).format('ddd D')}</Typography>
      <Box>
        <TimetableList hours={hours} date={date} />
      </Box>
    </Box>
  );
};

export { TimetableDesktop };
