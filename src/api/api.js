const API_URL = process.env.REACT_APP_API_URL;

export function getApi(code) {
  const meetingCode = code ? `${code}` : '';
  return `${API_URL}/${meetingCode}`;
}
