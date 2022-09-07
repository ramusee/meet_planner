import React, { useCallback } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { setDates } from '../../store/slices/datesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectDates } from '../../store/selectors';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const CalendarLib = ({ setIsNotValidDate }) => {
  const dates = useSelector(selectDates);
  const dispatch = useDispatch();

  const valueDates = dates.map(item => new DateObject(item.date));
  const onChange = useCallback(date => {
    const formatDates = date.map(item => ({ date: item.unix * 1000, coordsRanges: [] }));
    dispatch(setDates(formatDates));
    if (date.length) setIsNotValidDate(false);
  }, []);
  return (
    <div>
      <Calendar
        multiple
        sort
        value={valueDates}
        onChange={onChange}
        weekDays={weekDays}
        renderButton={(direction, handleClick) => (
          <button className="calendar_arrow" onClick={handleClick}>
            {direction === 'right' ? '❱' : '❰'}
          </button>
        )}
        mapDays={({ date, today, selectedDate, currentMonth, isSameDate }) => {
          let props = {};
          let isWeekend = [0, 6].includes(date.weekDay.index);

          props.style = {
            color: '#fff',
            width: '35px',
            height: '35px',
            fontSize: '18px',
            backgroundColor: date.month.index === currentMonth.index ? '#000' : '#FFF',
          };
          if (isWeekend)
            props.style = {
              ...props.style,
              color: '#a1a1a1',
            };
          if (isSameDate(date, today))
            props.style = {
              ...props.style,
              color: '#09CE69',
            };
          return props;
        }}
      />
    </div>
  );
};

export { CalendarLib };
