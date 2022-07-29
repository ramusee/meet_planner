export function upperLetter(word) {
	return word.split(' ')
				.map(item => item[0]
				.toUpperCase() + item.slice(1))
				.join(' ');
}