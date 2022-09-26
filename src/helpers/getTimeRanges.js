import { DateObject } from 'react-multi-date-picker';

export function getTimeRanges(dates) {
  const timeRanges = [];
  dates.forEach(item => {
    item.coordsRanges.forEach(range => {
      timeRanges.push(getRangeObj(item.date, range.timeStart, range.timeEnd));
    });
  });
  return timeRanges;
}
export function getRangeObj(date, timeStart, timeEnd) {
  return {
    lower: new Date(Date.parse(`${new DateObject(date).format()} ${timeStart}`)).toISOString(),
    upper: new Date(Date.parse(`${new DateObject(date).format()} ${timeEnd}`)).toISOString(),
  };
}
