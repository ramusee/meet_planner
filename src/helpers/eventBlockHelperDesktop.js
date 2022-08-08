const times = [
	'12:00', '12:30', '1:00', '1:30', '2:00', '2:30',
	'3:00', '3:30', '4:00', '4:30', '5:00', '5:30',
	'6:00', '6:30', '7:00', '7:30', '8:00', '8:30',
	'9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '0:00',
	'12:00', '12:30', '1:00', '1:30', '2:00', '2:30',
	'3:00', '3:30', '4:00', '4:30', '5:00', '5:30',
	'6:00', '6:30', '7:00', '7:30', '8:00', '8:30',
	'9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '0:00'
];

export function getDesktopTime(listHeight, coords) {
	const halfHourHeight = listHeight / 50;
	for (let i = 0; i < 49; i++) {
		if (coords < halfHourHeight * (i + 1)) {
			return times[i];
		}
	}
	return times[50];
}

export function getDesktopClosestCoords(listHeight, coords) {
	const halfHourHeight = listHeight / 48;
	const allCoords = [];
	for (let i = 0; i < 50; i++) {
		allCoords.push(i * halfHourHeight);
	}
	const closest = allCoords.reduce((prev, curr) => {
		return (Math.abs(curr - coords) < Math.abs(prev - coords) ? curr : prev);
	});
	return closest;
}

export function getClosestDesktopRangesTopCoords(ranges, coords) {
	const bottomCoords = [];
	ranges.forEach(item => {
		bottomCoords.push(item.bottom);
	});
	return Math.max(...bottomCoords.filter(item => item < coords));
}

export function getClosestDesktopRangesBottomCoords(ranges, coords) {
	const topCoords = [];
	ranges.forEach(item => {
		topCoords.push(item.top);
	});
	return Math.min(...topCoords.filter(item => item > coords));
}