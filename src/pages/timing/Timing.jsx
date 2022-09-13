import React from 'react';
import { useSelector } from 'react-redux';

import { DateObject } from 'react-multi-date-picker';
import { Link } from 'react-router-dom';

import { DatesPanel } from '../../components/timingComponents/datesPanel/DatesPanel';
import { NamingForm } from '../../components/namingComponents/NamingForm';

import { TimeTable } from '../../components/timingComponents/timeTable/TimeTable';
import { TimetableDesktop } from '../../components/timingComponents/timeTableDesktop/TimetableDesktop';
import { MonthsPanel } from '../../components/timingComponents/monthsPanel/MonthsPanel';

import { selectCurrentMonth, selectDates } from '../../store/selectors';

import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import s from './timing.module.css';

const Timing = () => {
  const matches = useMediaQuery('(min-width: 990px)');
  const dates = useSelector(selectDates);
  const currentMonth = useSelector(selectCurrentMonth);

  return (
    <>
      <Box px="10px">
        <Typography
          color="text.primary"
          textAlign="center"
          variant={matches ? 'h5' : 'body2'}
          fontWeight={matches ? '500' : '400'}
        >
          Give your available time with tap and drag
        </Typography>
        <Box className={s.settings_panel}>
          <span>
            <u>All day</u>
          </span>
          <span>
            Timezone: <u>PDT</u>
          </span>
        </Box>
      </Box>
      {!matches && <DatesPanel />}
      {matches && <MonthsPanel />}
      <Box>
        {matches ? (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mb: '10px',
              height: `100%`,
              width: '100%',
              overflowX: 'auto',
            }}
          >
            {dates.map(
              item =>
                `${new DateObject(item.date).month.name} ${new DateObject(item.date).year}` ===
                  currentMonth && <TimetableDesktop key={item.date} date={item.date} />,
            )}
          </Stack>
        ) : (
          dates.map(item => <TimeTable key={item.date} date={item.date} />)
        )}
      </Box>
      {!dates.length && (
        <Typography
          textAlign="center"
          variant="body1"
          color="text.primary"
          p="15px"
          sx={{
            backgroundColor: '#1f1f1f',
            borderRadius: '6px',
            margin: '0 auto 150px',
          }}
        >
          Select the dates in the previous step
        </Typography>
      )}
      <Stack direction="row" width="100%" justifyContent="space-between" alignItems="end">
        <Button component={Link} to="/date" variant="contained" color="success">
          Back
        </Button>
        {matches ? (
          <NamingForm />
        ) : (
          <Button component={Link} to="/naming" variant="contained" color="success">
            Next
          </Button>
        )}
      </Stack>
    </>
  );
};

export { Timing };
