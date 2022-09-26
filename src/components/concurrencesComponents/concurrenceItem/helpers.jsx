export function getReformatDate(dateWithTime) {
  const month = dateWithTime.slice(0, 2);
  const day = dateWithTime.slice(3, 5);
  const year = dateWithTime.slice(6, 10);
  const time = dateWithTime.slice(11, 19);
  const timeZone = dateWithTime.slice(-5);
  const result = Date.parse(`${year}-${month}-${day}T${time}${timeZone}`);
  return result;
}
