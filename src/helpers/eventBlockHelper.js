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
	const closest = allCoords.reduce((prev, curr) => {
		return (Math.abs(curr - coords) < Math.abs(prev - coords) ? curr : prev);
	});
	return closest;
}

export function getClosestFreeSlotsTopCoords(freeSlots, coords, ampm) {
	const bottomCoordsAm = [];
	const bottomCoordsPm = [];
	if (ampm === 'AM') {
		freeSlots.forEach(item => {
			if (item.id.slice(-2) === ampm) bottomCoordsAm.push(item.bottom);
		});
		return Math.max(...bottomCoordsAm.filter(item => item < coords));
	} else {
		freeSlots.forEach(item => {
			if ((item.id.slice(-2) === ampm) || item.id.slice(-2) === 'on') bottomCoordsPm.push(item.bottom);
		});
		return Math.max(...bottomCoordsPm.filter(item => item < coords));
	}
}

export function getClosestFreeSlotsBottomCoords(freeSlots, coords, ampm) {
	const topCoordsAm = [];
	const topCoordsPm = [];
	if (ampm === 'AM') {
		freeSlots.forEach(item => {
			if (item.id.slice(-2) === ampm) topCoordsAm.push(item.top);
		});
		return Math.min(...topCoordsAm.filter(item => item > coords));
	} else {
		freeSlots.forEach(item => {
			if (item.id.slice(-2) === ampm) topCoordsPm.push(item.top);
		});
		return Math.min(...topCoordsPm.filter(item => item > coords));
	}
	
}