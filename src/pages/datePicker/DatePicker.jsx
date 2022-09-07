import React, { useState } from 'react';
import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { DateObject } from 'react-multi-date-picker';
import './datePicker.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMonths, setCurrentDate, setCurrentMonth } from '../../store/slices/datesSlice';
import 'react-multi-date-picker/styles/colors/green.css';
import { selectCurrentDate, selectDates } from '../../store/selectors';
import { CalendarLib } from '../../components/calendarLib/CalendarLib';

function getSelectedMonths(dates) {
  const selectedMonths = [];
  dates.forEach(item => {
    const month = `${new DateObject(item.date).month.name} ${new DateObject(item.date).year}`;
    if (!selectedMonths.includes(month)) {
      selectedMonths.push(month);
    }
  });
  return selectedMonths;
}

const DatePicker = () => {
  const [isNotValidDate, setIsNotValidDate] = useState(false);
  const dispatch = useDispatch();
  const dates = useSelector(selectDates);
  const currentDate = useSelector(selectCurrentDate);
  const navigate = useNavigate();
  const isIncludesCurrentDate = dates.some(item => item.date === currentDate);

  const matches = useMediaQuery('(min-width: 990px)');

  const handlerBtnOnClick = () => {
    dispatch(setMonths([]));
    if (dates.length) {
      navigate('/timing');
      const currentMonthValue = `${new DateObject(dates[0].date).month.name} ${
        new DateObject(dates[0].date).year
      }`;
      dispatch(setCurrentMonth(currentMonthValue));
      dispatch(setMonths(getSelectedMonths(dates)));
      if (!currentDate || !isIncludesCurrentDate) {
        dispatch(setCurrentDate(dates[0].date));
      }
    } else {
      setIsNotValidDate(true);
    }
  };

  return (
    <>
      <Typography
        textAlign="center"
        variant={matches ? 'h5' : 'body2'}
        fontWeight={matches ? '500' : '400'}
        color="text.primary"
      >
        Pick all your available days
      </Typography>
      <Box
        sx={{
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <CalendarLib setIsNotValidDate={setIsNotValidDate} />
        {isNotValidDate && (
          <Typography
            color="error"
            p="15px"
            sx={{
              position: 'absolute',
              bottom: '0%',
              left: '27%',
              backgroundColor: '#1f1f1f',
              borderRadius: '6px',
            }}
          >
            Please, select dates
          </Typography>
        )}
      </Box>
      <Stack direction="row" width="100%" justifyContent="space-between">
        <Button component={Link} to="/" variant="contained" color="success">
          Back
        </Button>
        <Button onClick={handlerBtnOnClick} variant="contained" color="success">
          Next
        </Button>
      </Stack>
    </>
  );
};

export { DatePicker };
