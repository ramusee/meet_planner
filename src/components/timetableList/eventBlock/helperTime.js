export function getTime(y) {
	if (y <= 171) {
		return '12:00';
	} else if (y < 211) {
		return '12:30';
	} else if (y < 231) {
		return '1:00';
	} else if (y < 251) {
		return '1:30';
	} else if (y < 271) {
		return '2:00';
	} else if (y < 291) {
		return '2:30';
	} else if (y < 311) {
		return '3:00';
	} else if (y < 331) {
		return '3:30';
	} else if (y < 351) {
		return '4:00';
	} else if (y < 371) {
		return '4:30';
	} else if (y < 391) {
		return '5:00';
	} else if (y < 411) {
		return '5:30';
	} else if (y < 431) {
		return '6:00';
	} else if (y < 451) {
		return '6:30';
	} else if ( y < 471) {
		return '7:00';
	} else if (y < 491) {
		return '7:30';
	} else if (y < 511) {
		return '8:00';
	} else if (y < 531) {
		return '8:30';
	} else if (y < 551) {
		return '9:00';
	} else if (y < 571) {
		return '9:30';
	} else if (y < 591) {
		return '10:00';
	} else if (y < 611) {
		return '10:30';
	} else if (y < 631) {
		return '11:00';
	} else if (y < 651) {
		return '11:30';
	} else if (y >= 651) {
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