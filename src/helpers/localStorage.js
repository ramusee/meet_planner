export const saveMeetingCode = code => {
  localStorage.setItem('meetingCode', code);
};

export const getMeetingCode = () => {
  return localStorage.getItem('meetingCode') || '';
};
