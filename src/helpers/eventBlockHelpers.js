const timesAM = [
  '12:00 AM',
  '12:30 AM',
  '1:00 AM',
  '1:30 AM',
  '2:00 AM',
  '2:30 AM',
  '3:00 AM',
  '3:30 AM',
  '4:00 AM',
  '4:30 AM',
  '5:00 AM',
  '5:30 AM',
  '6:00 AM',
  '6:30 AM',
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
];
const timesPM = [
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM',
  '12:00 AM',
];

export function getTime(listHeight, coords, ampm) {
  const halfHourHeight = listHeight / 25;
  const isAm = ampm === 'AM';
  for (let i = 0; i < 24; i++) {
    if (coords < halfHourHeight * (i + 1)) {
      if (isAm) {
        return timesAM[i];
      } else {
        return timesPM[i];
      }
    }
  }
  if (isAm) {
    return timesAM[24];
  } else {
    return timesPM[24];
  }
}

export function getClosestCoords(listHeight, coords) {
  const halfHourHeight = listHeight / 24;
  const allCoords = [];
  for (let i = 0; i < 25; i++) {
    allCoords.push(i * halfHourHeight);
  }
  const closest = allCoords.reduce((prev, curr) => {
    return Math.abs(curr - coords) < Math.abs(prev - coords) ? curr : prev;
  });
  return closest;
}

export function getClosestRangesTopCoords(ranges, coords, ampm) {
  const bottomCoordsAm = [];
  const bottomCoordsPm = [];
  if (ampm === 'AM') {
    ranges.forEach(item => {
      if (item.id.slice(-2) === ampm) bottomCoordsAm.push(item.bottom);
    });
    return Math.max(...bottomCoordsAm.filter(item => item < coords));
  } else {
    ranges.forEach(item => {
      if (item.id.slice(-2) === ampm || item.id.slice(-2) === 'on') bottomCoordsPm.push(item.bottom);
    });
    return Math.max(...bottomCoordsPm.filter(item => item < coords));
  }
}

export function getClosestRangesBottomCoords(ranges, coords, ampm) {
  const topCoordsAm = [];
  const topCoordsPm = [];
  if (ampm === 'AM') {
    ranges.forEach(item => {
      if (item.id.slice(-2) === ampm) topCoordsAm.push(item.top);
    });
    return Math.min(...topCoordsAm.filter(item => item > coords));
  } else {
    ranges.forEach(item => {
      if (item.id.slice(-2) === ampm) topCoordsPm.push(item.top);
    });
    return Math.min(...topCoordsPm.filter(item => item > coords));
  }
}

export function getRanges(dates, date) {
  let ranges = [];
  dates.forEach(item => {
    if (item.date === date) {
      ranges = item.coordsRanges;
    }
  });
  return ranges;
}
