export function getTime(y) {
	if (y <= 190) {
		return '12:00';
	} else if (y < 210) {
		return '12:30';
	} else if (y < 230) {
		return '1:00';
	} else if (y < 250) {
		return '1:30';
	} else if (y < 270) {
		return '2:00';
	} else if (y < 290) {
		return '2:30';
	} else if (y < 310) {
		return '3:00';
	} else if (y < 330) {
		return '3:30';
	} else if (y < 350) {
		return '4:00';
	} else if (y < 370) {
		return '4:30';
	} else if (y < 390) {
		return '5:00';
	} else if (y < 410) {
		return '5:30';
	} else if (y < 430) {
		return '6:00';
	} else if (y < 450) {
		return '6:30';
	} else if ( y < 470) {
		return '7:00';
	} else if (y < 490) {
		return '7:30';
	} else if (y < 510) {
		return '8:00';
	} else if (y < 530) {
		return '8:30';
	} else if (y < 550) {
		return '9:00';
	} else if (y < 570) {
		return '9:30';
	} else if (y < 590) {
		return '10:00';
	} else if (y < 610) {
		return '10:30';
	} else if (y < 630) {
		return '11:00';
	} else if (y < 650) {
		return '11:30';
	} else if (y >= 650) {
		return '0:00';
	}
}

// export const times = new Map([
// 	[171, '12:00'],
// 	[191, '12:30'],
// 	[211, '1:00'],
// 	[231, '1:30'],
// 	[251, '2:00'],
// 	[271, '2:30'],
// 	[291, '3:00'],
// 	[311, '3:30'],
// 	[331, '4:00'],
// 	[351, '4:30'],
// 	[371, '5:00'],
// 	[391, '5:30'],
// 	[411, '6:00'],
// 	[431, '6:30'],
// 	[451, '7:00'],
// 	[471, '7:30'],
// 	[491, '8:00'],
// 	[511, '8:30'],
// 	[531, '9:00'],
// 	[551, '9:30'],
// 	[571, '10:00'],
// 	[591, '10:30'],
// 	[611, '11:00'],
// 	[631, '11:30'],
// 	[651, '0:00'],
// ]);