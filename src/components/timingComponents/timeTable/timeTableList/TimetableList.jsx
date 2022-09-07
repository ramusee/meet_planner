import React, { memo, useEffect, useRef } from 'react';
import { TimeTableItem } from './timeTableItem/TimeTableItem';
import s from './timetableList.module.css';

const TimetableList = ({ hours, date }) => {
  useEffect(() => {
    listRef.current.onpointerdown = () => {
      return false;
    };
  }, []);
  const listRef = useRef(null);
  return (
    <ul ref={listRef} className={s.timetable__list}>
      {hours.map(hour => (
        <TimeTableItem key={hour} hour={hour} date={date} listRef={listRef} />
      ))}
    </ul>
  );
};

export { TimetableList };
