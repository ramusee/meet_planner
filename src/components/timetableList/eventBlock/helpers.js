const times = [
	'12:00', '12:30', '1:00', '1:30', '2:00', '2:30',
	'3:00', '3:30', '4:00', '4:30', '5:00', '5:30',
	'6:00', '6:30', '7:00', '7:30', '8:00', '8:30',
	'9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '0:00'
];

export function getTime(listHeight, coords) {
	const halfHourHeight = listHeight / 25;
	for (let i = 0; i < 24; i++) {
		if (coords < halfHourHeight * (i + 1)) {
			return times[i];
		}
	}
	return times[24];
}

export function getClosestCoords(listHeight, coords) {
	const halfHourHeight = listHeight / 24;
	const allCoords = [];
	for (let i = 0; i < 25; i++) {
		allCoords.push(i * halfHourHeight);
	}
	return allCoords.sort((a, b) => Math.abs(coords - a) - Math.abs(coords - b))[0];
}