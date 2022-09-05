export const saveCurrentCode = (code) => {
	localStorage.setItem('currentCode', code);
};

export const getCurrentCode = () => {
	return localStorage.getItem('currentCode') || '';
};