// export function getTime(y) {
// 	if (y <= 190) {
// 		return '12:00';
// 	} else if (y < 210) {
// 		return '12:30';
// 	} else if (y < 230) {
// 		return '1:00';
// 	} else if (y < 250) {
// 		return '1:30';
// 	} else if (y < 270) {
// 		return '2:00';
// 	} else if (y < 290) {
// 		return '2:30';
// 	} else if (y < 310) {
// 		return '3:00';
// 	} else if (y < 330) {
// 		return '3:30';
// 	} else if (y < 350) {
// 		return '4:00';
// 	} else if (y < 370) {
// 		return '4:30';
// 	} else if (y < 390) {
// 		return '5:00';
// 	} else if (y < 410) {
// 		return '5:30';
// 	} else if (y < 430) {
// 		return '6:00';
// 	} else if (y < 450) {
// 		return '6:30';
// 	} else if ( y < 470) {
// 		return '7:00';
// 	} else if (y < 490) {
// 		return '7:30';
// 	} else if (y < 510) {
// 		return '8:00';
// 	} else if (y < 530) {
// 		return '8:30';
// 	} else if (y < 550) {
// 		return '9:00';
// 	} else if (y < 570) {
// 		return '9:30';
// 	} else if (y < 590) {
// 		return '10:00';
// 	} else if (y < 610) {
// 		return '10:30';
// 	} else if (y < 630) {
// 		return '11:00';
// 	} else if (y < 650) {
// 		return '11:30';
// 	} else if (y >= 650) {
// 		return '0:00';
// 	}
// }
const times = [
	'12:00', '12:30', '1:00', '1:30', '2:00', '2:30',
	'3:00', '3:30', '4:00', '4:30', '5:00', '5:30',
	'6:00', '6:30', '7:00', '7:30', '8:00', '8:30',
	'9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '0:00'
];

export function getTime(listHeight, coords) {
	const halfHourHeight = listHeight / 24;
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
	for (let i = 0; i < 24; i++) {
		allCoords.push(i * halfHourHeight)
	}
	
	return Math.max(...allCoords.filter(item => item < coords))
}